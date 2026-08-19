-- AI Hub Switzerland membership applications.
-- Run in Supabase → SQL Editor. Safe to run once.

CREATE TABLE IF NOT EXISTS public.switzerland_memberships (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at         timestamptz NOT NULL DEFAULT now(),
  -- Applicant identity
  user_id            uuid,                       -- linked auth user (if signed in)
  full_name          text NOT NULL,
  email              text NOT NULL,
  -- Professional profile (industry-standard membership fields)
  organization       text,
  job_title          text,
  membership_category text,                      -- Researcher / Technology Expert / Entrepreneur / Policymaker / Student / Other
  seniority          text,                       -- Individual / Manager / Director / Executive / Founder
  country            text,
  city               text,
  linkedin_url       text,
  website            text,
  areas_of_interest  text[],                     -- Governance, Research, Enterprise AI, Education, ...
  bio                text,                        -- motivation / how they want to contribute
  -- Consent & compliance
  consent            boolean NOT NULL DEFAULT false,
  -- Review workflow
  status             text NOT NULL DEFAULT 'pending',  -- pending / approved / rejected
  ai_recommendation  text,                        -- agent screening suggestion (approve / review / reject)
  ai_score           integer,                     -- 0-100 completeness/quality score
  review_notes       text,
  reviewed_at        timestamptz
);

CREATE INDEX IF NOT EXISTS idx_swiss_memberships_status     ON public.switzerland_memberships (status);
CREATE INDEX IF NOT EXISTS idx_swiss_memberships_created_at ON public.switzerland_memberships (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_swiss_memberships_email      ON public.switzerland_memberships (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_swiss_memberships_user ON public.switzerland_memberships (user_id) WHERE user_id IS NOT NULL;

-- RLS: only the service role (admin API) may read/write. No public access.
ALTER TABLE public.switzerland_memberships ENABLE ROW LEVEL SECURITY;
-- (No policies = no anon/authenticated access; the app uses the service-role key server-side.)
