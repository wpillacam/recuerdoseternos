-- Recuerdos Eternos / Yuyarisqayki -- migracion 3: el admin puede editar cualquier memorial
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, despues de migration_2_templates.sql

create or replace function is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (select 1 from profiles where id = uid and is_admin);
$$;

drop policy if exists owner_updates_memorial on memorials;
create policy owner_updates_memorial on memorials for update using (
  auth.uid() = owner_id or is_admin(auth.uid())
);

drop policy if exists owner_manages_life_events on life_events;
create policy owner_manages_life_events on life_events for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id) or is_admin(auth.uid())
);

drop policy if exists owner_manages_family_members on family_members;
create policy owner_manages_family_members on family_members for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id) or is_admin(auth.uid())
);

drop policy if exists owner_manages_photos on memorial_photos;
create policy owner_manages_photos on memorial_photos for all using (
  auth.uid() = (select owner_id from memorials where id = memorial_id) or is_admin(auth.uid())
);
