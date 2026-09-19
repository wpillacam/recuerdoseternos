-- Recuerdos Eternos / Yuyarisqayki -- 2 memoriales DEMO de mascotas para ventas
-- Ejecutar despues de seed_demo_memorials.sql (requiere que exista la columna is_demo,
-- ver migration_4_demo_flag.sql, y el usuario admin@yuyarisqayki.com).
-- Idempotente: usa ids fijos + on conflict, se puede volver a correr sin duplicar.

-- ============================================================
-- DEMO 4: Clasica Luminosa -- Rocky (perro)
-- ============================================================
insert into memorials (
  id, owner_id, full_name, birth_date, death_date, quechua_phrase, biography,
  avatar_url, cover_photo_url, occupation, featured_quote, birth_place,
  client_contact_name, admin_notes, template_id, theme_color, is_demo
) values (
  'd0000000-0000-0000-0000-000000000004',
  (select id from auth.users where email = 'admin@yuyarisqayki.com'),
  'Rocky', '2015-06-10', '2024-03-02',
  'Sonqoykipi wiñaypaq kawsanki',
  'Rocky llego a la familia siendo un cachorro que cabia en una sola mano y se fue nueve anios despues habiendo ocupado todo el corazon de la casa. Recibia a cada visita moviendo la cola como si fuera la mejor noticia del dia, dormia en el sofa prohibido apenas nadie miraba, y nunca dejo pasar una pelota sin perseguirla hasta el cansancio. Fue guardian, companiero de tardes lluviosas y el primero en consolar cuando algo salia mal.',
  'https://loremflickr.com/400/400/dog,goldenretriever?lock=101',
  'https://loremflickr.com/1200/500/dog?lock=102',
  'Guardián de la casa y mejor amigo de la familia',
  'La lealtad más pura que puede sentir un corazón',
  'Bajo la mesa de la cocina, en una tarde lluviosa de junio',
  'DEMO (no es cliente real)',
  'Memorial de demostracion -- mascota (perro), plantilla Clasica Luminosa.',
  'classic-light', '#c6a664', true
)
on conflict (id) do update set
  full_name = excluded.full_name,
  birth_date = excluded.birth_date,
  death_date = excluded.death_date,
  quechua_phrase = excluded.quechua_phrase,
  biography = excluded.biography,
  avatar_url = excluded.avatar_url,
  cover_photo_url = excluded.cover_photo_url,
  occupation = excluded.occupation,
  featured_quote = excluded.featured_quote,
  birth_place = excluded.birth_place,
  client_contact_name = excluded.client_contact_name,
  admin_notes = excluded.admin_notes,
  template_id = excluded.template_id,
  theme_color = excluded.theme_color,
  is_demo = true;

delete from life_events where memorial_id = 'd0000000-0000-0000-0000-000000000004';
insert into life_events (memorial_id, year_label, description, sort_order) values
  ('d0000000-0000-0000-0000-000000000004', '2015', 'Nace en una camada de labradores en Huanta.', 1),
  ('d0000000-0000-0000-0000-000000000004', '2015', 'Llega a su nueva familia dentro de una caja de cartón.', 2),
  ('d0000000-0000-0000-0000-000000000004', '2018', 'Aprende su truco favorito: dar la pata para pedir premios.', 3),
  ('d0000000-0000-0000-0000-000000000004', '2022', 'Se convierte en el guardián oficial del patio.', 4),
  ('d0000000-0000-0000-0000-000000000004', '2024', 'Se despide rodeado de quienes más lo amaron.', 5);

delete from family_members where memorial_id = 'd0000000-0000-0000-0000-000000000004';
insert into family_members (memorial_id, name, relation, sort_order) values
  ('d0000000-0000-0000-0000-000000000004', 'Familia Ramírez', 'Su familia', 1),
  ('d0000000-0000-0000-0000-000000000004', 'Valentina', 'La niña que lo bañaba los domingos', 2),
  ('d0000000-0000-0000-0000-000000000004', 'Max', 'Su amigo felino de toda la vida', 3);

delete from memorial_photos where memorial_id = 'd0000000-0000-0000-0000-000000000004';
insert into memorial_photos (memorial_id, url, caption, sort_order) values
  ('d0000000-0000-0000-0000-000000000004', 'https://loremflickr.com/800/600/dog,puppy?lock=103', 'Su primer día en casa', 1),
  ('d0000000-0000-0000-0000-000000000004', 'https://loremflickr.com/800/600/dog,sofa?lock=104', 'Durmiendo en "su" sofá', 2),
  ('d0000000-0000-0000-0000-000000000004', 'https://loremflickr.com/800/600/dog,park?lock=105', 'Persiguiendo la pelota en el parque', 3);

-- ============================================================
-- DEMO 5: Clasica Oscura -- Silvestre (gato)
-- ============================================================
insert into memorials (
  id, owner_id, full_name, birth_date, death_date, quechua_phrase, biography,
  avatar_url, cover_photo_url, occupation, featured_quote, birth_place,
  client_contact_name, admin_notes, template_id, theme_color, is_demo
) values (
  'd0000000-0000-0000-0000-000000000005',
  (select id from auth.users where email = 'admin@yuyarisqayki.com'),
  'Silvestre', '2012-10-31', '2023-08-19',
  'Kausayninchik mana tukukunchu',
  'Silvestre aparecio un dia en el techo de la casa y decidio, con la autoridad silenciosa de todo gato, que ese seria su hogar. Nunca pidio permiso para nada: elegia su propio horario, dormia donde queria y solo aparecia por cariño cuando le convenia. Pero en las noches frias siempre terminaba acurrucado en la misma cama, y fue testigo silencioso de cada conversacion importante en esa casa durante once anios.',
  'https://loremflickr.com/400/400/cat,blackcat?lock=201',
  'https://loremflickr.com/1200/500/cat,night?lock=202',
  'Cazador nocturno y filósofo de la casa',
  'Independiente hasta el final, fiel a su manera',
  'Un techo del barrio, una noche de Halloween',
  'DEMO (no es cliente real)',
  'Memorial de demostracion -- mascota (gato), plantilla Clasica Oscura.',
  'classic-dark', '#8fb3e0', true
)
on conflict (id) do update set
  full_name = excluded.full_name,
  birth_date = excluded.birth_date,
  death_date = excluded.death_date,
  quechua_phrase = excluded.quechua_phrase,
  biography = excluded.biography,
  avatar_url = excluded.avatar_url,
  cover_photo_url = excluded.cover_photo_url,
  occupation = excluded.occupation,
  featured_quote = excluded.featured_quote,
  birth_place = excluded.birth_place,
  client_contact_name = excluded.client_contact_name,
  admin_notes = excluded.admin_notes,
  template_id = excluded.template_id,
  theme_color = excluded.theme_color,
  is_demo = true;

delete from life_events where memorial_id = 'd0000000-0000-0000-0000-000000000005';
insert into life_events (memorial_id, year_label, description, sort_order) values
  ('d0000000-0000-0000-0000-000000000005', '2012', 'Aparece por primera vez en el techo de la casa, la noche de Halloween.', 1),
  ('d0000000-0000-0000-0000-000000000005', '2013', 'Se gana un lugar oficial dentro de la casa tras semanas de negociación.', 2),
  ('d0000000-0000-0000-0000-000000000005', '2016', 'Se declara dueño absoluto del sillón de la sala.', 3),
  ('d0000000-0000-0000-0000-000000000005', '2020', 'Sobrevive a una mudanza sin perder la compostura.', 4),
  ('d0000000-0000-0000-0000-000000000005', '2023', 'Se despide en silencio, como vivió.', 5);

delete from family_members where memorial_id = 'd0000000-0000-0000-0000-000000000005';
insert into family_members (memorial_id, name, relation, sort_order) values
  ('d0000000-0000-0000-0000-000000000005', 'Familia Torres', 'Su familia', 1),
  ('d0000000-0000-0000-0000-000000000005', 'Abuela Carmen', 'La única que lo consintió sin límites', 2),
  ('d0000000-0000-0000-0000-000000000005', 'Mateo', 'El niño que aprendió a quererlo pese a sus rasguños', 3);

delete from memorial_photos where memorial_id = 'd0000000-0000-0000-0000-000000000005';
insert into memorial_photos (memorial_id, url, caption, sort_order) values
  ('d0000000-0000-0000-0000-000000000005', 'https://loremflickr.com/800/600/cat,window?lock=203', 'Vigilando desde la ventana', 1),
  ('d0000000-0000-0000-0000-000000000005', 'https://loremflickr.com/800/600/cat,sun?lock=204', 'Su siesta favorita al sol', 2),
  ('d0000000-0000-0000-0000-000000000005', 'https://loremflickr.com/800/600/cat,funny?lock=205', 'La foto que casi no se dejó tomar', 3);
