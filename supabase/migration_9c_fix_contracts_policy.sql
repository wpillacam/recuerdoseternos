-- Recuerdos Eternos / Yuyarisqayki -- arregla (a fondo) el permiso de insercion en "contracts"
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Este script borra CUALQUIER politica que haya quedado en la tabla
-- "contracts" (por si quedo una con otro nombre o mal definida de un
-- intento anterior) y crea de nuevo, limpio, el permiso de insercion.
-- No borra ningun dato de la tabla.

do $$
declare
  pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'contracts'
  loop
    execute format('drop policy %I on public.contracts', pol.policyname);
  end loop;
end $$;

alter table contracts enable row level security;

create policy anyone_creates_contracts on contracts
  for insert
  to anon, authenticated
  with check (true);

-- Verificacion: esto deberia devolver 1 fila con la politica recien creada.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'contracts';
