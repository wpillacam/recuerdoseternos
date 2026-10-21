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
  biography_qu text,
  featured_quote_qu text,
  occupation_qu text,
  avatar_url text,
  is_public boolean not null default true,
  visit_count integer not null default 0,
  candle_count integer not null default 0,
  video_url text,
  song_url text,
  song_title text,
  created_at timestamptz not null default now()
);

create table if not exists life_events (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  year_label text not null,
  description text not null,
  description_qu text,
  sort_order integer not null default 0
);

create table if not exists family_members (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  name text not null,
  relation text,
  relation_qu text,
  sort_order integer not null default 0
);

create table if not exists memorial_photos (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  url text not null,
  caption text,
  caption_qu text,
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

create table if not exists candle_lights (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists candle_lights_memorial_id_idx on candle_lights(memorial_id);
create index if not exists candle_lights_created_at_idx on candle_lights(created_at);

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
  insert into candle_lights (memorial_id) values (memorial_id_input);
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
alter table candle_lights enable row level security;

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

drop policy if exists anyone_adds_candle_lights on candle_lights;
create policy anyone_adds_candle_lights on candle_lights for insert with check (true);

drop policy if exists owner_reads_candle_lights on candle_lights;
create policy owner_reads_candle_lights on candle_lights for select using (
  auth.uid() = (select owner_id from memorials where id = memorial_id)
);

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
-- CONTRATOS DIGITALES (cero papel)
-- ============================================================

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  token text not null unique default replace(gen_random_uuid()::text, '-', ''),
  vendedor_nombre text,
  cliente_nombre text not null,
  cliente_dni text,
  cliente_whatsapp text,
  cliente_correo text,
  cliente_direccion text,
  homenajeado_nombre text,
  relacion_cliente text,
  zona text,
  plantilla text,
  precio numeric,
  forma_pago text,
  estado text not null default 'Pendiente',
  fecha_aceptacion timestamptz
);

create index if not exists contracts_token_idx on contracts(token);

alter table contracts enable row level security;

drop policy if exists anyone_creates_contracts on contracts;
create policy anyone_creates_contracts on contracts for insert with check (true);

-- Sin politica de select/update: toda lectura y aceptacion pasa por las
-- funciones de abajo, que exigen el token exacto del contrato.

create or replace function get_contract_by_token(p_token text)
returns table (
  id uuid, created_at timestamptz, vendedor_nombre text, cliente_nombre text,
  cliente_dni text, cliente_whatsapp text, cliente_correo text, cliente_direccion text,
  homenajeado_nombre text, relacion_cliente text, zona text, plantilla text,
  precio numeric, forma_pago text, estado text, fecha_aceptacion timestamptz
)
language sql security definer set search_path = public
as $$
  select id, created_at, vendedor_nombre, cliente_nombre, cliente_dni, cliente_whatsapp,
         cliente_correo, cliente_direccion, homenajeado_nombre, relacion_cliente, zona,
         plantilla, precio, forma_pago, estado, fecha_aceptacion
  from contracts where token = p_token;
$$;

create or replace function accept_contract(p_token text)
returns table (
  id uuid, created_at timestamptz, vendedor_nombre text, cliente_nombre text,
  cliente_dni text, cliente_whatsapp text, cliente_correo text, cliente_direccion text,
  homenajeado_nombre text, relacion_cliente text, zona text, plantilla text,
  precio numeric, forma_pago text, estado text, fecha_aceptacion timestamptz
)
language plpgsql security definer set search_path = public
as $$
begin
  update contracts
  set estado = 'Aceptado', fecha_aceptacion = now()
  where contracts.token = p_token and contracts.estado = 'Pendiente';
  return query
  select contracts.id, contracts.created_at, contracts.vendedor_nombre, contracts.cliente_nombre,
         contracts.cliente_dni, contracts.cliente_whatsapp, contracts.cliente_correo,
         contracts.cliente_direccion, contracts.homenajeado_nombre, contracts.relacion_cliente,
         contracts.zona, contracts.plantilla, contracts.precio, contracts.forma_pago,
         contracts.estado, contracts.fecha_aceptacion
  from contracts where contracts.token = p_token;
end;
$$;

create or replace function create_contract(
  p_vendedor_nombre text, p_cliente_nombre text, p_cliente_dni text, p_cliente_whatsapp text,
  p_cliente_correo text, p_cliente_direccion text, p_homenajeado_nombre text, p_relacion_cliente text,
  p_zona text, p_plantilla text, p_precio numeric, p_forma_pago text
)
returns table (id uuid, token text)
language plpgsql security definer set search_path = public
as $$
declare
  new_id uuid;
  new_token text;
begin
  insert into contracts (
    vendedor_nombre, cliente_nombre, cliente_dni, cliente_whatsapp, cliente_correo,
    cliente_direccion, homenajeado_nombre, relacion_cliente, zona, plantilla, precio, forma_pago
  ) values (
    p_vendedor_nombre, p_cliente_nombre, p_cliente_dni, p_cliente_whatsapp, p_cliente_correo,
    p_cliente_direccion, p_homenajeado_nombre, p_relacion_cliente, p_zona, p_plantilla, p_precio, p_forma_pago
  )
  returning contracts.id, contracts.token into new_id, new_token;
  return query select new_id, new_token;
end;
$$;

-- ============================================================
-- Despues de correr este script:
-- 1. Crea tu usuario admin desde Authentication -> Users -> Add user.
-- 2. Vuelve aqui y marca tu usuario como admin:
--    insert into profiles (id, is_admin) values ('TU-USER-ID-AQUI', true)
--    on conflict (id) do update set is_admin = true;
-- ============================================================
