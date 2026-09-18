-- Recuerdos Eternos / Yuyarisqayki -- esquema de base de datos
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
-- Nota: los nombres de politicas usan snake_case sin comillas a proposito,
-- para evitar errores si el editor de tu navegador convierte comillas rectas
-- en comillas tipograficas al copiar y pegar.

-- ============================================================
-- TABLAS
-- ============================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists memorials (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  birth_date date,
  death_date date,
  quechua_phrase text,
  biography text,
  avatar_url text,
  is_public boolean not null default true,
  visit_count integer not null default 0,
  candle_count integer not null default 0,
  video_url text,
  created_at timestamptz not null default now()
);

create table if not exists life_events (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  year_label text not null,
  description text not null,
  sort_order integer not null default 0
);

create table if not exists family_members (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  name text not null,
  relation text,
  sort_order integer not null default 0
);

create table if not exists memorial_photos (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  url text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists condolences (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  author_name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- FUNCIONES (incrementos atomicos para visitantes anonimos)
-- ============================================================

create or replace function increment_visit(memorial_id_input uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update memorials set visit_count = visit_count + 1 where id = memorial_id_input;
$$;

create or replace function increment_candle(memorial_id_input uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update memorials set candle_count = candle_count + 1 where id = memorial_id_input;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table memorials enable row level security;
alter table life_events enable row level security;
alter table family_members enable row level security;
alter table memorial_photos enable row level security;
alter table condolences enable row level security;

drop policy if exists public_read_memorials on memorials;
create policy public_read_memorials on memorials for select using (true);

drop policy if exists public_read_life_events on life_events;
create policy public_read_life_events on life_events for select using (true);

drop policy if exists public_read_family_members on family_members;
create policy public_read_family_members on family_members for select using (true);

drop policy if exists public_read_memorial_photos on memorial_photos;
create policy public_read_memorial_photos on memorial_photos for select using (true);

drop policy if exists public_read_condolences on condolences;
create policy public_read_condolences on condolences for select using (true);

drop policy if exists owner_updates_memorial on memorials;
create policy owner_updates_memorial on memorials for update using (auth.uid() = owner_id);

drop policy if exists owner_manages_life_events on life_events;
create policy owner_manages_life_events on life_events for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id)
);

drop policy if exists owner_manages_family_members on family_members;
create policy owner_manages_family_members on family_members for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id)
);

drop policy if exists owner_manages_photos on memorial_photos;
create policy owner_manages_photos on memorial_photos for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id)
);

drop policy if exists anyone_adds_condolences on condolences;
create policy anyone_adds_condolences on condolences for insert with check (true);

drop policy if exists own_profile_select on profiles;
create policy own_profile_select on profiles for select using (auth.uid() = id);

drop policy if exists own_profile_insert on profiles;
create policy own_profile_insert on profiles for insert with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- STORAGE (fotos y video de cada memorial)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('memorial-media', 'memorial-media', true)
on conflict (id) do nothing;

drop policy if exists public_read_memorial_media on storage.objects;
create policy public_read_memorial_media on storage.objects
  for select using (bucket_id = 'memorial-media');

drop policy if exists authenticated_upload_memorial_media on storage.objects;
create policy authenticated_upload_memorial_media on storage.objects
  for insert with check (bucket_id = 'memorial-media' and auth.role() = 'authenticated');

drop policy if exists authenticated_update_memorial_media on storage.objects;
create policy authenticated_update_memorial_media on storage.objects
  for update using (bucket_id = 'memorial-media' and auth.role() = 'authenticated');

drop policy if exists authenticated_delete_memorial_media on storage.objects;
create policy authenticated_delete_memorial_media on storage.objects
  for delete using (bucket_id = 'memorial-media' and auth.role() = 'authenticated');

-- ============================================================
-- Despues de correr este script:
-- 1. Crea tu usuario admin desde Authentication -> Users -> Add user.
-- 2. Vuelve aqui y marca tu usuario como admin:
--    insert into profiles (id, is_admin) values ('TU-USER-ID-AQUI', true)
--    on conflict (id) do update set is_admin = true;
-- ============================================================
