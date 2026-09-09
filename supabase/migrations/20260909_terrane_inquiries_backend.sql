-- TERRANE inquiry backend. Applied to Veltrix Hom (jqpeohbbbmnoujxaiutr).
-- Source of truth lives in schema terrane. Public surface is RPC only.

create schema if not exists terrane;

revoke all on schema terrane from public;
grant usage on schema terrane to postgres, service_role;

create table if not exists terrane.inquiries (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  name text not null,
  email text not null,
  project_type text not null,
  budget text not null,
  site_city text not null,
  brief text not null,
  status text not null default 'received',
  notification_status text not null default 'pending',
  notification_at timestamptz,
  notification_error text,
  notification_attempts integer not null default 0,
  client_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint terrane_inquiries_name_len check (char_length(name) between 1 and 120),
  constraint terrane_inquiries_email_len check (char_length(email) between 3 and 200),
  constraint terrane_inquiries_type_ok check (project_type in ('house','interior','landscape','reuse','other')),
  constraint terrane_inquiries_budget_ok check (budget in ('explore','25-50','50-100','100-250','250+')),
  constraint terrane_inquiries_site_len check (char_length(site_city) between 1 and 160),
  constraint terrane_inquiries_brief_len check (char_length(brief) between 3 and 3000),
  constraint terrane_inquiries_request_len check (char_length(request_id) between 8 and 120),
  constraint terrane_inquiries_status_ok check (status in ('received','reviewed','closed')),
  constraint terrane_inquiries_notify_ok check (notification_status in ('pending','sent','failed','skipped_unconfigured','duplicate_suppressed'))
);

create index if not exists terrane_inquiries_created_idx on terrane.inquiries (created_at desc);
create index if not exists terrane_inquiries_email_idx on terrane.inquiries (lower(email), created_at desc);

create table if not exists terrane.rate_events (
  id bigint generated always as identity primary key,
  bucket text not null,
  created_at timestamptz not null default now(),
  constraint terrane_rate_bucket_len check (char_length(bucket) between 8 and 128)
);

create index if not exists terrane_rate_bucket_idx on terrane.rate_events (bucket, created_at desc);

alter table terrane.inquiries enable row level security;
alter table terrane.rate_events enable row level security;

revoke all on terrane.inquiries from public, anon, authenticated;
revoke all on terrane.rate_events from public, anon, authenticated;
grant all on terrane.inquiries to postgres, service_role;
grant all on terrane.rate_events to postgres, service_role;
