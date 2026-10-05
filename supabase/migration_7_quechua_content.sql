-- Recuerdos Eternos / Yuyarisqayki -- migracion 7: contenido en quechua
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Hasta ahora el boton ES/QU solo traducia los menus y botones de la pagina;
-- el contenido propio de cada memorial (biografia, frase destacada, ocupacion,
-- linea de vida, relacion familiar, pie de foto) quedaba siempre en el idioma
-- en que se escribio. Esta migracion agrega una columna "_qu" al lado de cada
-- campo traducible, para guardar la version en quechua ayacuchano.
--
-- No rompe nada: si un memorial no tiene el campo _qu lleno (por ejemplo,
-- los memoriales de clientes reales que aun no se tradujeron), la pagina
-- simplemente sigue mostrando el texto en espaniol como hasta ahora.

alter table memorials add column if not exists biography_qu text;
alter table memorials add column if not exists featured_quote_qu text;
alter table memorials add column if not exists occupation_qu text;

alter table life_events add column if not exists description_qu text;

alter table family_members add column if not exists relation_qu text;

alter table memorial_photos add column if not exists caption_qu text;

-- Las politicas de lectura publica (public_read_memorials, public_read_life_events,
-- public_read_family_members, public_read_memorial_photos) ya cubren toda la fila,
-- asi que las columnas nuevas quedan visibles automaticamente sin tocar RLS.

-- ============================================================
-- Despues de correr esto, avisale a Claude para que cargue las traducciones
-- en quechua ayacuchano de los 4 memoriales demo (Rosa, Manuel, Rocky y Silvestre).
-- ============================================================
