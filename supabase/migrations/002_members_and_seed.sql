-- Add is_my_org flag so the app knows which org is "yours"
alter table organizations add column is_my_org boolean not null default false;

-- Your organisation
insert into organizations (id, name, industry, is_my_org) values
  ('00000000-0000-0000-0000-000000000010', 'Procura', 'Supply Chain', true);

-- Members of your org
create table org_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade,
  name text not null,
  email text,
  avatar_url text,
  created_at timestamptz default now()
);

insert into org_members (id, org_id, name, email) values
  ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000010', 'You',             'daugatsa@gmail.com'),
  ('00000000-0000-0000-0001-000000000002', '00000000-0000-0000-0000-000000000010', 'Anna Berg',       'anna.berg@procura.com'),
  ('00000000-0000-0000-0001-000000000003', '00000000-0000-0000-0000-000000000010', 'Erik Svensson',   'erik.svensson@procura.com'),
  ('00000000-0000-0000-0001-000000000004', '00000000-0000-0000-0000-000000000010', 'Maria Johansson', 'maria.johansson@procura.com');

-- Re-point policies.owner_id to org_members instead of auth.users
alter table policies drop column owner_id;
alter table policies add column owner_id uuid references org_members;

-- Seed two policies with active versions
insert into policies (id, title, owner_id, created_at, updated_at) values
  ('00000000-0000-0000-0002-000000000001', 'Supplier Code of Conduct', '00000000-0000-0000-0001-000000000002', now(), now()),
  ('00000000-0000-0000-0002-000000000002', 'Environmental Policy',     '00000000-0000-0000-0001-000000000003', now(), now());

insert into policy_versions (id, policy_id, version_number, status, require_esignature, published_at) values
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0002-000000000001', 'v.1.00', 'active', true,  now() - interval '7 days'),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0002-000000000002', 'v.1.00', 'active', false, now() - interval '3 days');

-- Receivers for each policy
insert into policy_receivers (id, policy_id, organization_id) values
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000001'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000002'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000003'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000004'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000005'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000001'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000002'),
  (gen_random_uuid(), '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000003');

-- Signing records covering all four statuses
insert into version_signing_records (version_id, organization_id, status, signed_at) values
  -- Code of Conduct: one of each status
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000001', 'signed',       now() - interval '4 days'),
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000002', 'pending',      null),
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000003', 'rejected',     null),
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000004', 'needs_review', null),
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000005', 'pending',      null),
  -- Environmental Policy
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000001', 'signed',       now() - interval '1 day'),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000002', 'needs_review', null),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000003', 'pending',      null);
