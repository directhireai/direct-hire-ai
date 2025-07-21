-- Example Supabase schema
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text check (role in ('candidate', 'company')),
  created_at timestamp default now()
);

create table candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text,
  skills text[],
  experience integer,
  location text,
  availability boolean,
  outreach_credits integer default 10
);

create table companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  company_name text,
  industry text,
  outreach_credits integer default 20
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references users(id),
  to_user_id uuid references users(id),
  subject text,
  body text,
  read boolean default false,
  sent_at timestamp default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  plan text,
  status text,
  start_date timestamp,
  end_date timestamp
);
