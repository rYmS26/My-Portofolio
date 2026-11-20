-- ============================================================================
-- DevFolio Studio — Supabase PostgreSQL Schema & Row Level Security (RLS)
-- ============================================================================

create extension if not exists "pgcrypto";

-- 1. TABEL PROFILE_SETTINGS
create table if not exists public.profile_settings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null,
  bio text not null,
  location text not null,
  email text not null,
  github_url text not null,
  linkedin_url text not null,
  resume_url text not null,
  availability_status text not null default 'available'
    check (availability_status in ('available', 'open_to_selective', 'unavailable')),
  availability_note text not null,
  years_of_experience integer not null default 6,
  systems_architected integer not null default 14,
  avg_latency_reduction_pct integer not null default 64,
  updated_at timestamptz not null default now()
);

-- 2. TABEL PROJECTS (Case Studies)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  code text not null unique,
  title text not null,
  summary text not null,
  role text not null,
  period text not null,
  client_or_company text not null,
  tech_stack text[] not null default '{}',
  architecture_overview text not null,
  technical_challenges text not null,
  key_metrics jsonb not null default '[]'::jsonb,
  thumbnail_url text not null default '/images/projects/default.svg',
  live_url text,
  repo_url text,
  is_featured boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_slug on public.projects (slug);
create index if not exists idx_projects_published_order on public.projects (published, display_order asc);

-- 3. TABEL EXPERIENCES (Work Experience Timeline)
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  role_title text not null,
  employment_type text not null default 'Full-time'
    check (employment_type in ('Full-time', 'Contract', 'Advisory')),
  location text not null,
  start_date text not null,
  end_date text,
  is_current boolean not null default false,
  highlights text[] not null default '{}',
  tech_used text[] not null default '{}',
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists idx_experiences_order on public.experiences (display_order asc);

-- 4. TABEL POSTS (Technical Blog / Engineering Notes)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  code text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null
    check (category in ('System Architecture', 'Database & SQL', 'Frontend Performance', 'DevOps & Cloud')),
  reading_time_minutes integer not null default 5,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_published_date on public.posts (published, published_at desc);

-- 5. TABEL INQUIRIES (Hire Me / Contact Inbox)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  sender_name text not null,
  sender_email text not null,
  company text not null,
  inquiry_type text not null
    check (inquiry_type in ('Full-time Role', 'Project Consultation', 'Technical Advisory')),
  budget_or_comp text not null,
  message text not null,
  status text not null default 'unread'
    check (status in ('unread', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists idx_inquiries_status_created on public.inquiries (status, created_at desc);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Optimized with scalar subquery initPlan)
-- ============================================================================

alter table public.profile_settings enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.posts enable row level security;
alter table public.inquiries enable row level security;

-- Public Read Access for Portfolio Data
create policy "Public can read profile_settings"
  on public.profile_settings for select
  to anon, authenticated
  using (true);

create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true or (select auth.uid()) is not null);

create policy "Public can read experiences"
  on public.experiences for select
  to anon, authenticated
  using (true);

create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (published = true or (select auth.uid()) is not null);

-- Public Insert Access for Contact / Hire Me Inquiries
create policy "Public can submit hire inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- Authenticated Admin Full Management Access
create policy "Admin can manage profile_settings"
  on public.profile_settings for all
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Admin can manage projects"
  on public.projects for all
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Admin can manage experiences"
  on public.experiences for all
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Admin can manage posts"
  on public.posts for all
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Admin can read and update inquiries"
  on public.inquiries for all
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
