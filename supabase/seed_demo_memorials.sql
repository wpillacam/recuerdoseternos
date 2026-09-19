-- Recuerdos Eternos / Yuyarisqayki -- 3 memoriales DEMO permanentes para ventas
-- Ejecutar despues de migration_4_demo_flag.sql
-- Idempotente: se puede volver a correr sin duplicar datos (usa ids fijos + on conflict).
-- Requiere que ya exista el usuario admin@yuyarisqayki.com (ajusta el correo abajo si es otro).

-- ============================================================
-- DEMO 1: Clasica Luminosa -- Rosa Amelia Torres Mendoza
-- ============================================================
insert into memorials (
  id, owner_id, full_name, birth_date, death_date, quechua_phrase, biography,
  avatar_url, cover_photo_url, occupation, featured_quote, birth_place,
  client_contact_name, admin_notes, template_id, theme_color, is_demo
) values (
  'd0000000-0000-0000-0000-000000000001',
  (select id from auth.users where email = 'admin@yuyarisqayki.com'),
  'Rosa Amelia Torres Mendoza', '1948-03-12', '2023-11-04',
  'Sonqoykipi wiñaypaq kawsanki',
  'Rosa dedico mas de cuarenta anios a la ensenianza en escuelas rurales de Ayacucho. Formo a generaciones enteras con paciencia y carino, y su casa siempre tuvo la puerta abierta para quien necesitara una palabra de aliento.',
  'https://i.pravatar.cc/400?img=47',
  'https://picsum.photos/seed/demo-rosa-cover/1200/500',
  'Maestra rural',
  'Su sabiduria guiara siempre a la familia',
  'Huamanga, Ayacucho',
  'DEMO (no es cliente real)',
  'Memorial de demostracion -- plantilla Clasica Luminosa. Usar para mostrar el estilo calido a clientes potenciales.',
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

delete from life_events where memorial_id = 'd0000000-0000-0000-0000-000000000001';
insert into life_events (memorial_id, year_label, description, sort_order) values
  ('d0000000-0000-0000-0000-000000000001', '1948', 'Nace en Huamanga, Ayacucho.', 1),
  ('d0000000-0000-0000-0000-000000000001', '1970', 'Se gradua como maestra de educacion primaria.', 2),
  ('d0000000-0000-0000-0000-000000000001', '1975', 'Se casa con Julio Mendoza y forma su familia.', 3),
  ('d0000000-0000-0000-0000-000000000001', '1982', 'Funda la escuela comunal de su pueblo natal.', 4),
  ('d0000000-0000-0000-0000-000000000001', '2023', 'Fallece rodeada de sus hijos y nietos.', 5);

delete from family_members where memorial_id = 'd0000000-0000-0000-0000-000000000001';
insert into family_members (memorial_id, name, relation, sort_order) values
  ('d0000000-0000-0000-0000-000000000001', 'Julio Mendoza', 'Esposo', 1),
  ('d0000000-0000-0000-0000-000000000001', 'Carmen Mendoza Torres', 'Hija', 2),
  ('d0000000-0000-0000-0000-000000000001', 'Luis Mendoza Torres', 'Hijo', 3),
  ('d0000000-0000-0000-0000-000000000001', 'Ana Sofia Quispe Mendoza', 'Nieta', 4);

delete from memorial_photos where memorial_id = 'd0000000-0000-0000-0000-000000000001';
insert into memorial_photos (memorial_id, url, caption, sort_order) values
  ('d0000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/demo-rosa-1/800/600', 'En la escuela, 1985', 1),
  ('d0000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/demo-rosa-2/800/600', 'Con su familia', 2),
  ('d0000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/demo-rosa-3/800/600', 'Celebrando sus 70 anios', 3);

-- ============================================================
-- DEMO 2: Clasica Oscura -- Manuel Ernesto Vidal Rojas
-- ============================================================
insert into memorials (
  id, owner_id, full_name, birth_date, death_date, quechua_phrase, biography,
  avatar_url, cover_photo_url, occupation, featured_quote, birth_place,
  client_contact_name, admin_notes, template_id, theme_color, is_demo
) values (
  'd0000000-0000-0000-0000-000000000002',
  (select id from auth.users where email = 'admin@yuyarisqayki.com'),
  'Manuel Ernesto Vidal Rojas', '1955-07-22', '2024-02-15',
  'Kausayninchik mana tukukunchu',
  'Manuel fue ingeniero civil y participo en la construccion de caminos y puentes que hoy siguen uniendo pueblos enteros en el sur del Peru. Amaba la musica criolla y reunir a toda la familia los domingos.',
  'https://i.pravatar.cc/400?img=12',
  'https://picsum.photos/seed/demo-manuel-cover/1200/500',
  'Ingeniero civil',
  'Construyo no solo caminos, sino tambien suenios',
  'Arequipa',
  'DEMO (no es cliente real)',
  'Memorial de demostracion -- plantilla Clasica Oscura. Usar para mostrar el estilo elegante a clientes potenciales.',
  'classic-dark', '#d4af37', true
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

delete from life_events where memorial_id = 'd0000000-0000-0000-0000-000000000002';
insert into life_events (memorial_id, year_label, description, sort_order) values
  ('d0000000-0000-0000-0000-000000000002', '1955', 'Nace en Arequipa.', 1),
  ('d0000000-0000-0000-0000-000000000002', '1978', 'Se titula como ingeniero civil.', 2),
  ('d0000000-0000-0000-0000-000000000002', '1983', 'Se casa con Teresa Rojas.', 3),
  ('d0000000-0000-0000-0000-000000000002', '1995', 'Lidera la construccion de la carretera de su provincia.', 4),
  ('d0000000-0000-0000-0000-000000000002', '2024', 'Fallece en paz junto a su familia.', 5);

delete from family_members where memorial_id = 'd0000000-0000-0000-0000-000000000002';
insert into family_members (memorial_id, name, relation, sort_order) values
  ('d0000000-0000-0000-0000-000000000002', 'Teresa Rojas de Vidal', 'Esposa', 1),
  ('d0000000-0000-0000-0000-000000000002', 'Diego Vidal Rojas', 'Hijo', 2),
  ('d0000000-0000-0000-0000-000000000002', 'Valeria Vidal Rojas', 'Hija', 3);

delete from memorial_photos where memorial_id = 'd0000000-0000-0000-0000-000000000002';
insert into memorial_photos (memorial_id, url, caption, sort_order) values
  ('d0000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/demo-manuel-1/800/600', 'En obra, 1995', 1),
  ('d0000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/demo-manuel-2/800/600', 'Con Teresa', 2),
  ('d0000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/demo-manuel-3/800/600', 'Reunion familiar', 3);

-- ============================================================
-- DEMO 3: Personalizada -- Ejemplo de diseno a medida
-- ============================================================
insert into memorials (
  id, owner_id, full_name, birth_date, death_date, occupation, featured_quote,
  birth_place, client_contact_name, admin_notes, template_id, custom_html, is_demo
) values (
  'd0000000-0000-0000-0000-000000000003',
  (select id from auth.users where email = 'admin@yuyarisqayki.com'),
  'Ejemplo de Diseno Personalizado', '1950-01-01', '2022-01-01',
  'Diseno de muestra', 'Cada historia merece un espacio propio',
  'Peru',
  'DEMO (no es cliente real)',
  'Memorial de demostracion -- plantilla Personalizada. Reemplaza custom_html con el diseno real cuando tengas uno mejor. Solo se puede actualizar por SQL (aun no hay editor visual para custom_html).',
  'custom',
$demohtml$<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Diseño Personalizado — Ejemplo</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Georgia, "Times New Roman", serif;
    background: #101014;
    color: #f2ede4;
    min-height: 100vh;
  }
  .hero {
    position: relative;
    height: 60vh;
    min-height: 380px;
    background: url('https://picsum.photos/seed/demo-custom-hero/1400/900') center/cover;
  }
  .hero::after {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(16,16,20,0.1) 0%, rgba(16,16,20,0.95) 100%);
  }
  .hero__content {
    position: absolute; bottom: 32px; left: 0; right: 0;
    text-align: center; z-index: 1;
  }
  .hero__content h1 { font-size: 2.2rem; letter-spacing: 1px; color: #e9c46a; }
  .hero__content p {
    margin-top: 6px; font-size: 1rem; text-transform: uppercase;
    letter-spacing: 3px; color: #cfc7b8;
  }
  main { max-width: 640px; margin: 0 auto; padding: 40px 24px 60px; text-align: center; }
  .divider { width: 60px; height: 2px; background: #e9c46a; margin: 0 auto 24px; }
  .quote { font-style: italic; font-size: 1.2rem; line-height: 1.6; color: #f2ede4; margin-bottom: 28px; }
  .note { font-size: 0.9rem; color: #a9a196; line-height: 1.6; }
  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 32px 0; }
  .gallery img { width: 100%; height: 120px; object-fit: cover; border-radius: 6px; }
</style>
</head>
<body>
  <div class="hero">
    <div class="hero__content">
      <h1>Ejemplo de Diseño Personalizado</h1>
      <p>Así de único puede ser el memorial de tu ser querido</p>
    </div>
  </div>
  <main>
    <div class="divider"></div>
    <p class="quote">"Cada historia merece un espacio propio, hecho a su medida — no una plantilla."</p>
    <div class="gallery">
      <img src="https://picsum.photos/seed/demo-custom-1/300/300" alt="" />
      <img src="https://picsum.photos/seed/demo-custom-2/300/300" alt="" />
      <img src="https://picsum.photos/seed/demo-custom-3/300/300" alt="" />
    </div>
    <p class="note">Este es solo un ejemplo del tipo de diseño exclusivo que se crea desde cero para cada familia que elige la opción personalizada. Colores, tipografía, orden de las secciones y estilo visual se adaptan completamente a la historia de cada persona.</p>
  </main>
</body>
</html>
$demohtml$,
  true
)
on conflict (id) do update set
  full_name = excluded.full_name,
  birth_date = excluded.birth_date,
  death_date = excluded.death_date,
  occupation = excluded.occupation,
  featured_quote = excluded.featured_quote,
  birth_place = excluded.birth_place,
  client_contact_name = excluded.client_contact_name,
  admin_notes = excluded.admin_notes,
  template_id = excluded.template_id,
  custom_html = excluded.custom_html,
  is_demo = true;
