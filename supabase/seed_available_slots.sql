-- Recuerdos Eternos / Yuyarisqayki -- 5 memoriales "disponibles" (QR ya impresos, sin asignar)
-- Ejecutar despues de migration_5_placeholder_flag.sql
-- Uso: cuando un cliente compra en el momento, le entregas una de estas placas ya impresas
-- (el QR ya apunta a un enlace real) y luego cargas el contenido real desde /admin/clients/:id.
-- En cuanto guardes cambios desde el editor, el memorial deja de mostrarse como "disponible"
-- automaticamente.
-- Idempotente: usa ids fijos + on conflict, se puede volver a correr sin duplicar.

insert into memorials (id, owner_id, full_name, template_id, is_demo, is_placeholder)
values
  ('a0000000-0000-0000-0000-000000000001', (select id from auth.users where email = 'admin@yuyarisqayki.com'), 'Espacio disponible 1', 'classic-light', false, true),
  ('a0000000-0000-0000-0000-000000000002', (select id from auth.users where email = 'admin@yuyarisqayki.com'), 'Espacio disponible 2', 'classic-light', false, true),
  ('a0000000-0000-0000-0000-000000000003', (select id from auth.users where email = 'admin@yuyarisqayki.com'), 'Espacio disponible 3', 'classic-light', false, true),
  ('a0000000-0000-0000-0000-000000000004', (select id from auth.users where email = 'admin@yuyarisqayki.com'), 'Espacio disponible 4', 'classic-light', false, true),
  ('a0000000-0000-0000-0000-000000000005', (select id from auth.users where email = 'admin@yuyarisqayki.com'), 'Espacio disponible 5', 'classic-light', false, true)
on conflict (id) do update set
  is_placeholder = true;
