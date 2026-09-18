import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData?.user) {
    return res.status(401).json({ error: "Sesión inválida" });
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("is_admin")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    return res.status(403).json({ error: "No tienes permisos de administrador" });
  }

  const {
    email,
    tempPassword,
    fullName,
    birthDate,
    deathDate,
    birthPlace,
    occupation,
    featuredQuote,
    clientContactName,
    clientContactPhone,
    adminNotes,
    templateId,
    themeColor,
    customHtml,
  } = req.body || {};

  if (!email || !tempPassword || !fullName) {
    return res.status(400).json({ error: "Faltan datos (correo, contraseña o nombre)" });
  }

  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (createError) {
    return res.status(400).json({ error: createError.message });
  }

  const { data: memorial, error: memorialError } = await supabaseAdmin
    .from("memorials")
    .insert({
      owner_id: newUser.user.id,
      full_name: fullName,
      birth_date: birthDate || null,
      death_date: deathDate || null,
      birth_place: birthPlace || null,
      occupation: occupation || null,
      featured_quote: featuredQuote || null,
      client_contact_name: clientContactName || null,
      client_contact_phone: clientContactPhone || null,
      admin_notes: adminNotes || null,
      template_id: templateId || "classic-light",
      theme_color: themeColor || "#c6a664",
      custom_html: templateId === "custom" ? customHtml || null : null,
    })
    .select()
    .single();

  if (memorialError) {
    return res.status(400).json({ error: memorialError.message });
  }

  return res.status(200).json({ memorialId: memorial.id, email, tempPassword });
}
