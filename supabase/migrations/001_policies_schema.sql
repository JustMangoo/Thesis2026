create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  created_at timestamptz default now()
);

create table policies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  owner_id uuid references auth.users,
  reminder_period_days int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid references policies on delete cascade,
  version_number text not null,
  status text not null default 'draft',
  require_esignature boolean default false,
  numbered_sections boolean default false,
  alternative_documentation text default 'none',
  styled_pdf_url text,
  created_at timestamptz default now(),
  published_at timestamptz
);

create table policy_sections (
  id uuid primary key default gen_random_uuid(),
  version_id uuid references policy_versions on delete cascade,
  order_index int not null,
  title text,
  content jsonb,
  footnote text,
  created_at timestamptz default now()
);

create table policy_receivers (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid references policies on delete cascade,
  organization_id uuid references organizations,
  added_at timestamptz default now(),
  unique (policy_id, organization_id)
);

create table version_signing_records (
  id uuid primary key default gen_random_uuid(),
  version_id uuid references policy_versions,
  organization_id uuid references organizations,
  status text not null default 'pending',
  signed_at timestamptz,
  rejection_document_url text,
  created_at timestamptz default now(),
  unique (version_id, organization_id)
);

-- Seed organizations
insert into organizations (id, name, industry) values
  ('00000000-0000-0000-0000-000000000001', 'Globex', 'Manufacturing'),
  ('00000000-0000-0000-0000-000000000002', 'Initech', 'Technology'),
  ('00000000-0000-0000-0000-000000000003', 'OmniCorp', 'Retail'),
  ('00000000-0000-0000-0000-000000000004', 'Acme Corp', 'Manufacturing'),
  ('00000000-0000-0000-0000-000000000005', 'Umbrella Ltd', 'Pharmaceutical');
