-- Link analytics sessions to authenticated users so the admin Users dashboard
-- can report per-user sessions, accessed areas, and time spent.
-- Run this in Supabase → SQL Editor. Safe to run once.

ALTER TABLE public.analytics_sessions
  ADD COLUMN IF NOT EXISTS user_id uuid,
  ADD COLUMN IF NOT EXISTS user_email text;

-- Index for fast per-user aggregation.
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_user_id
  ON public.analytics_sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_analytics_sessions_user_email
  ON public.analytics_sessions (user_email);
