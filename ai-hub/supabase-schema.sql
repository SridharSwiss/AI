-- Run this once in Supabase SQL Editor: https://supabase.com/dashboard/project/zfunyhhckyubfqghbwqq/sql

create table if not exists analytics_sessions (
  id uuid primary key,
  created_at timestamptz default now(),
  last_seen_at timestamptz default now(),
  device_type text,
  browser text,
  os text,
  referrer_source text,
  referrer_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  session_duration_secs int default 0,
  page_count int default 0
);

create table if not exists analytics_pageviews (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references analytics_sessions(id) on delete cascade,
  created_at timestamptz default now(),
  page_path text not null,
  page_title text,
  time_spent_secs int default 0
);

create index if not exists idx_sessions_created on analytics_sessions(created_at desc);
create index if not exists idx_pageviews_session on analytics_pageviews(session_id);
create index if not exists idx_pageviews_path on analytics_pageviews(page_path);
create index if not exists idx_pageviews_created on analytics_pageviews(created_at desc);

-- Function to increment page count on session
create or replace function increment_page_count(sid uuid)
returns void language sql as $$
  update analytics_sessions
  set page_count = page_count + 1,
      last_seen_at = now()
  where id = sid;
$$;

-- Disable RLS so our server-side API routes can write freely
alter table analytics_sessions disable row level security;
alter table analytics_pageviews disable row level security;
