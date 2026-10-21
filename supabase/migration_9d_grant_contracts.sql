-- Recuerdos Eternos / Yuyarisqayki -- otorga el permiso base de insercion en "contracts"
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Las politicas (RLS) que ya creamos le dicen a Postgres "en que casos" se
-- permite insertar, pero antes de eso el rol "anon" (el que usa la pagina
-- cuando nadie inicio sesion) necesita el permiso basico de insertar en la
-- tabla. Esta tabla es nueva y, a diferencia de las demas, no tiene ese
-- permiso base todavia -- por eso seguia fallando aunque la politica ya
-- estaba bien. Este script se lo da. No borra ningun dato.

grant insert on contracts to anon, authenticated;
grant select on contracts to authenticated;
