ALTER TABLE public.travel_history 
  ADD COLUMN IF NOT EXISTS month integer,
  ADD COLUMN IF NOT EXISTS transport_to_destination text,
  ADD COLUMN IF NOT EXISTS tourist_spots jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS local_transport text,
  ADD COLUMN IF NOT EXISTS restaurants jsonb DEFAULT '[]'::jsonb;