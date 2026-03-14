
-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create travel_history table
CREATE TABLE public.travel_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  budget NUMERIC NOT NULL,
  people INTEGER NOT NULL DEFAULT 1,
  group_type TEXT NOT NULL DEFAULT 'solo',
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  entertainment TEXT[] NOT NULL DEFAULT '{}',
  food TEXT[] NOT NULL DEFAULT '{}',
  accommodation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.travel_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own travel history"
  ON public.travel_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own travel history"
  ON public.travel_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own travel history"
  ON public.travel_history FOR DELETE
  USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_travel_history_updated_at
  BEFORE UPDATE ON public.travel_history
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for user queries
CREATE INDEX idx_travel_history_user_id ON public.travel_history(user_id);
