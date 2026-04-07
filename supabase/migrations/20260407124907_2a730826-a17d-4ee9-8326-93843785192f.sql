
CREATE TABLE public.accommodation_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  accommodation_name TEXT NOT NULL,
  city_id TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.accommodation_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view accommodation reviews" ON public.accommodation_reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own accommodation reviews" ON public.accommodation_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accommodation reviews" ON public.accommodation_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE UNIQUE INDEX idx_accommodation_reviews_unique ON public.accommodation_reviews (user_id, accommodation_name, city_id);

CREATE TABLE public.activity_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_name TEXT NOT NULL,
  city_id TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activity reviews" ON public.activity_reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own activity reviews" ON public.activity_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own activity reviews" ON public.activity_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE UNIQUE INDEX idx_activity_reviews_unique ON public.activity_reviews (user_id, activity_name, city_id);
