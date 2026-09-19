-- Recuerdos Eternos / Yuyarisqayki -- migracion 4: marcar memoriales de demostracion
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, despues de migration_3_admin_content.sql

alter table memorials add column if not exists is_demo boolean not null default false;
