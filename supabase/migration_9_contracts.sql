-- Recuerdos Eternos / Yuyarisqayki -- contratos digitales (cero papel)
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Cada vendedor(a) llena un formulario con los datos del cliente; se crea un
-- registro aqui con un "token" unico. Ese token arma el enlace que se le
-- manda al cliente por WhatsApp para que revise el contrato y toque
-- "Si, acepto". Nadie puede leer ni listar la tabla directamente desde el
-- navegador (no hay politica de SELECT): solo se puede leer/aceptar un
-- contrato puntual a traves de las funciones de abajo, usando su token
-- exacto -- asi no se exponen los datos (DNI, telefono) de todos los
-- clientes a cualquiera que consulte la tabla.

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  token text not null unique default replace(gen_random_uuid()::text, '-', ''),
  vendedor_nombre text,
  cliente_nombre text not null,
  cliente_dni text,
  cliente_whatsapp text,
  cliente_correo text,
  cliente_direccion text,
  homenajeado_nombre text,
  relacion_cliente text,
  zona text,
  plantilla text,
  precio numeric,
  forma_pago text,
  estado text not null default 'Pendiente',
  fecha_aceptacion timestamptz
);

create index if not exists contracts_token_idx on contracts(token);

alter table contracts enable row level security;

-- El formulario de la vendedora inserta sin estar logueada.
drop policy if exists anyone_creates_contracts on contracts;
create policy anyone_creates_contracts on contracts for insert with check (true);

-- A proposito NO hay politica de select ni de update para anon/authenticated:
-- toda lectura y aceptacion pasa por las funciones de abajo, que exigen el
-- token exacto.

create or replace function get_contract_by_token(p_token text)
returns table (
  id uuid,
  created_at timestamptz,
  vendedor_nombre text,
  cliente_nombre text,
  cliente_dni text,
  cliente_whatsapp text,
  cliente_correo text,
  cliente_direccion text,
  homenajeado_nombre text,
  relacion_cliente text,
  zona text,
  plantilla text,
  precio numeric,
  forma_pago text,
  estado text,
  fecha_aceptacion timestamptz
)
language sql
security definer
set search_path = public
as $$
  select id, created_at, vendedor_nombre, cliente_nombre, cliente_dni, cliente_whatsapp,
         cliente_correo, cliente_direccion, homenajeado_nombre, relacion_cliente, zona,
         plantilla, precio, forma_pago, estado, fecha_aceptacion
  from contracts
  where token = p_token;
$$;

create or replace function accept_contract(p_token text)
returns table (
  id uuid,
  created_at timestamptz,
  vendedor_nombre text,
  cliente_nombre text,
  cliente_dni text,
  cliente_whatsapp text,
  cliente_correo text,
  cliente_direccion text,
  homenajeado_nombre text,
  relacion_cliente text,
  zona text,
  plantilla text,
  precio numeric,
  forma_pago text,
  estado text,
  fecha_aceptacion timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  update contracts
  set estado = 'Aceptado', fecha_aceptacion = now()
  where token = p_token and estado = 'Pendiente';

  return query
  select id, created_at, vendedor_nombre, cliente_nombre, cliente_dni, cliente_whatsapp,
         cliente_correo, cliente_direccion, homenajeado_nombre, relacion_cliente, zona,
         plantilla, precio, forma_pago, estado, fecha_aceptacion
  from contracts
  where token = p_token;
end;
$$;

-- ============================================================
-- Despues de correr esto:
-- - Se crea la tabla "contracts" (vacia).
-- - El formulario de la vendedora (que voy a agregar al codigo) podra crear
--   contratos y armar el enlace de aceptacion.
-- - La pagina publica /contrato/:token podra mostrarle el contrato al
--   cliente y dejarlo aceptar con un boton.
-- ============================================================
