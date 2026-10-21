-- Recuerdos Eternos / Yuyarisqayki -- funcion para crear un contrato sin exponer la tabla
-- Ejecutar UNA VEZ en el SQL Editor de Supabase (Project -> SQL Editor -> New query)
--
-- El formulario (/contrato/nuevo) va a usar esta funcion en vez de insertar
-- directo, porque asi no necesitamos darle a nadie permiso de LEER la tabla
-- "contracts" (que tiene DNI y telefonos de los clientes) solo para poder
-- devolver el codigo del contrato recien creado.

create or replace function create_contract(
  p_vendedor_nombre text,
  p_cliente_nombre text,
  p_cliente_dni text,
  p_cliente_whatsapp text,
  p_cliente_correo text,
  p_cliente_direccion text,
  p_homenajeado_nombre text,
  p_relacion_cliente text,
  p_zona text,
  p_plantilla text,
  p_precio numeric,
  p_forma_pago text
)
returns table (id uuid, token text)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  new_token text;
begin
  insert into contracts (
    vendedor_nombre, cliente_nombre, cliente_dni, cliente_whatsapp, cliente_correo,
    cliente_direccion, homenajeado_nombre, relacion_cliente, zona, plantilla, precio, forma_pago
  ) values (
    p_vendedor_nombre, p_cliente_nombre, p_cliente_dni, p_cliente_whatsapp, p_cliente_correo,
    p_cliente_direccion, p_homenajeado_nombre, p_relacion_cliente, p_zona, p_plantilla, p_precio, p_forma_pago
  )
  returning contracts.id, contracts.token into new_id, new_token;

  return query select new_id, new_token;
end;
$$;
