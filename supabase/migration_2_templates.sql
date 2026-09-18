-- Recuerdos Eternos / Yuyarisqayki -- migracion 2: plantillas + campos de registro
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, despues de schema.sql

alter table memorials add column if not exists template_id text not null default 'classic-light';
alter table memorials add column if not exists theme_color text not null default '#c6a664';
alter table memorials add column if not exists custom_html text;
alter table memorials add column if not exists cover_photo_url text;
alter table memorials add column if not exists occupation text;
alter table memorials add column if not exists featured_quote text;
alter table memorials add column if not exists birth_place text;
alter table memorials add column if not exists client_contact_name text;
alter table memorials add column if not exists client_contact_phone text;
alter table memorials add column if not exists admin_notes text;
