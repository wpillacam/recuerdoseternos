-- Recuerdos Eternos / Yuyarisqayki -- arregla el permiso de insercion en "contracts"
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Al probar el formulario, la insercion desde el navegador (sin login) fallo
-- con "new row violates row-level security policy" -- significa que la
-- tabla quedo con RLS activado pero sin la politica de insercion creada
-- correctamente. Este script la vuelve a crear de forma segura (no duplica
-- si ya existiera, y no borra ningun dato de la tabla).

alter table contracts enable row level security;

drop policy if exists anyone_creates_contracts on contracts;
create policy anyone_creates_contracts on contracts for insert with check (true);
