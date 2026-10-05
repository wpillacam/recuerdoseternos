-- Recuerdos Eternos / Yuyarisqayki -- historial de velas digitales
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
-- Esta tabla guarda cada vez que alguien enciende una vela, con fecha y hora,
-- para poder ver la actividad a lo largo del tiempo (no solo el total acumulado).

create table if not exists candle_lights (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references memorials(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists candle_lights_memorial_id_idx on candle_lights(memorial_id);
create index if not exists candle_lights_created_at_idx on candle_lights(created_at);

alter table candle_lights enable row level security;

drop policy if exists anyone_adds_candle_lights on candle_lights;
create policy anyone_adds_candle_lights on candle_lights for insert with check (true);

drop policy if exists owner_reads_candle_lights on candle_lights;
create policy owner_reads_candle_lights on candle_lights for select using (
  auth.uid() = (select owner_id from memorials where id = memorial_id)
);

-- Actualiza la funcion para que, ademas de sumar el contador en memorials,
-- tambien registre el evento en candle_lights.
create or replace function increment_candle(memorial_id_input uuid)
returns void
language sql
security definer
set search_path = public
as $$
  insert into candle_lights (memorial_id) values (memorial_id_input);
  update memorials set candle_count = candle_count + 1 where id = memorial_id_input;
$$;

-- ============================================================
-- Despues de correr esto:
-- - El contador que ya se ve en cada memorial sigue funcionando igual.
-- - Cada clic en "Encender una vela" ahora tambien queda guardado con su fecha,
--   en la tabla candle_lights, para siempre.
-- - No hace falta cambiar nada en el codigo de la pagina: ya esta listo para usarla.
-- ============================================================
