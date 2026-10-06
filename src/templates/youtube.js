// Extrae el ID de un video de YouTube a partir de cualquier formato de
// enlace (normal, corto o ya embebido). Devuelve "" si no lo reconoce.
export function getYoutubeId(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return u.pathname.replace("/embed/", "");
      const id = u.searchParams.get("v");
      if (id) return id;
    }
  } catch {
    // URL invalida
  }
  return "";
}
