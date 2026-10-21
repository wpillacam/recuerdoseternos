-- Recuerdos Eternos / Yuyarisqayki -- corrige ambiguedad en accept_contract
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- Al probar, dio error "column reference 'estado' is ambiguous" -- la
-- funcion tenia una columna de salida llamada igual que la columna de la
-- tabla ("estado"), y Postgres no sabia a cual me referia dentro del
-- UPDATE. Aqui la version corregida, con la tabla indicada explicitamente.

create or replace function accept_contract(p_token text)
returns table (
  id uuid, created_at timestamptz, vendedor_nombre text, cliente_nombre text,
  cliente_dni text, cliente_whatsapp text, cliente_correo text, cliente_direccion text,
  homenajeado_nombre text, relacion_cliente text, zona text, plantilla text,
  precio numeric, forma_pago text, estado text, fecha_aceptacion timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  update contracts
  set estado = 'Aceptado', fecha_aceptacion = now()
  where contracts.token = p_token and contracts.estado = 'Pendiente';

  return query
  select contracts.id, contracts.created_at, contracts.vendedor_nombre, contracts.cliente_nombre,
         contracts.cliente_dni, contracts.cliente_whatsapp, contracts.cliente_correo,
         contracts.cliente_direccion, contracts.homenajeado_nombre, contracts.relacion_cliente,
         contracts.zona, contracts.plantilla, contracts.precio, contracts.forma_pago,
         contracts.estado, contracts.fecha_aceptacion
  from contracts
  where contracts.token = p_token;
end;
$$;
