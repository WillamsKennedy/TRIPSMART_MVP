
-- 1. Fix travel_history: scope policies to authenticated and add UPDATE policy
ALTER POLICY "Users can view their own travel history" ON public.travel_history TO authenticated;
ALTER POLICY "Users can create their own travel history" ON public.travel_history TO authenticated;
ALTER POLICY "Users can delete their own travel history" ON public.travel_history TO authenticated;

CREATE POLICY "Users can update their own travel history"
  ON public.travel_history FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Fix shared_itineraries: create triggers to auto-update aggregates
-- so owners can't falsify them directly

-- Function to recalculate likes_count
CREATE OR REPLACE FUNCTION public.update_itinerary_likes_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE shared_itineraries SET likes_count = (
      SELECT COUNT(*) FROM itinerary_likes WHERE itinerary_id = NEW.itinerary_id
    ) WHERE id = NEW.itinerary_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE shared_itineraries SET likes_count = (
      SELECT COUNT(*) FROM itinerary_likes WHERE itinerary_id = OLD.itinerary_id
    ) WHERE id = OLD.itinerary_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_update_likes_count
  AFTER INSERT OR DELETE ON public.itinerary_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_itinerary_likes_count();

-- Function to recalculate rating_avg and rating_count
CREATE OR REPLACE FUNCTION public.update_itinerary_rating_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_id := OLD.itinerary_id;
  ELSE
    target_id := NEW.itinerary_id;
  END IF;

  UPDATE shared_itineraries SET
    rating_avg = COALESCE((SELECT AVG(score)::numeric FROM itinerary_ratings WHERE itinerary_id = target_id), 0),
    rating_count = (SELECT COUNT(*) FROM itinerary_ratings WHERE itinerary_id = target_id)
  WHERE id = target_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_update_rating_stats
  AFTER INSERT OR UPDATE OR DELETE ON public.itinerary_ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_itinerary_rating_stats();

-- Replace the UPDATE policy to prevent direct aggregate manipulation
DROP POLICY "Users can update own itineraries" ON public.shared_itineraries;

CREATE POLICY "Users can update own itineraries"
  ON public.shared_itineraries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND rating_avg IS NOT DISTINCT FROM (SELECT rating_avg FROM shared_itineraries WHERE id = shared_itineraries.id)
    AND rating_count IS NOT DISTINCT FROM (SELECT rating_count FROM shared_itineraries WHERE id = shared_itineraries.id)
    AND likes_count IS NOT DISTINCT FROM (SELECT likes_count FROM shared_itineraries WHERE id = shared_itineraries.id)
  );
