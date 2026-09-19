-- Recuerdos Eternos / Yuyarisqayki -- migracion 5: memoriales "disponibles" (sin asignar)
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, despues de migration_4_demo_flag.sql

alter table memorials add column if not exists is_placeholder boolean not null default false;
