-- Migracion 8: cancion del memorial (enlace de YouTube)
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)

alter table memorials add column if not exists song_url text;
alter table memorials add column if not exists song_title text;

-- No se requieren cambios de RLS: estas columnas se leen y escriben con las
-- mismas politicas que ya existen sobre la tabla memorials.
