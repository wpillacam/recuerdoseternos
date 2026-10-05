-- Recuerdos Eternos / Yuyarisqayki -- condolencias de ejemplo para los memoriales DEMO
-- Ejecutar despues de seed_demo_memorials.sql y seed_demo_pets.sql
-- Idempotente: usa ids fijos + on conflict, se puede volver a correr sin duplicar.

-- DEMO 1: Rosa Amelia Torres Mendoza (maestra)
insert into condolences (id, memorial_id, author_name, message, created_at) values
  ('c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Ana Lucía Ramos', 'Fui su alumna en los años 80 y jamás olvidaré su paciencia. Gracias por todo lo que sembró en nosotros, profesora Rosa.', now() - interval '18 days'),
  ('c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'Familia Quispe', 'Una mujer extraordinaria que dejó huella en cada niño que pasó por su aula. Descanse en paz.', now() - interval '11 days'),
  ('c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'Pedro Mendoza', 'Mamá, tu risa y tus consejos nos acompañan cada día. Te extrañamos muchísimo.', now() - interval '3 days')
on conflict (id) do nothing;

-- DEMO 2: Manuel Ernesto Vidal Rojas (ingeniero civil)
insert into condolences (id, memorial_id, author_name, message, created_at) values
  ('c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'Carlos Villanueva', 'Trabajé con Manuel en la carretera de Arequipa. Un profesional admirable y mejor persona aún.', now() - interval '20 days'),
  ('c0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000002', 'Teresa Rojas', 'Cada domingo sigo esperando escuchar tu música criolla en la sala. Te amo por siempre.', now() - interval '9 days'),
  ('c0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000002', 'Diego Vidal', 'Papá, gracias por enseñarme a construir puentes, en el trabajo y en la vida.', now() - interval '2 days')
on conflict (id) do nothing;

-- DEMO 3: Ejemplo de Diseño Personalizado
insert into condolences (id, memorial_id, author_name, message, created_at) values
  ('c0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000003', 'Visitante Demo', 'Así se vería un mensaje de condolencia en un diseño hecho a la medida.', now() - interval '6 days'),
  ('c0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000003', 'Familia Ejemplo', 'Gracias por acompañarnos en este espacio preparado especialmente para nosotros.', now() - interval '1 days')
on conflict (id) do nothing;

-- DEMO 4: Rocky (perro)
insert into condolences (id, memorial_id, author_name, message, created_at) values
  ('c0000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000004', 'Familia Torres', 'Rocky, la casa no es lo mismo sin tus ladridos de bienvenida. Te extrañamos, buen chico.', now() - interval '14 days'),
  ('c0000000-0000-0000-0000-00000000000a', 'd0000000-0000-0000-0000-000000000004', 'Valentina', 'Nunca olvidaré nuestras tardes jugando en el parque. Gracias por tanto amor, Rocky.', now() - interval '4 days')
on conflict (id) do nothing;

-- DEMO 5: Silvestre (gato)
insert into condolences (id, memorial_id, author_name, message, created_at) values
  ('c0000000-0000-0000-0000-00000000000b', 'd0000000-0000-0000-0000-000000000005', 'Mariana Castro', 'Silvestre, gracias por elegirnos como tu familia. Tu independencia y tu cariño a tu manera nos marcaron para siempre.', now() - interval '16 days'),
  ('c0000000-0000-0000-0000-00000000000c', 'd0000000-0000-0000-0000-000000000005', 'Renzo', 'Aún busco tu silueta en el sillón cada noche. Descansa, gato sabio.', now() - interval '5 days')
on conflict (id) do nothing;
