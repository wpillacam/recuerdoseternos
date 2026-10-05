// Convierte un enlace de YouTube (normal, corto o ya embebido) a su URL de
// embed, para poder usarlo directo en un <iframe>. Si no reconoce el
// formato, devuelve la URL tal cual (por si ya es un embed valido).
export function toYoutubeEmbed(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return url;
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // URL invalida; se devuelve tal cual abajo
  }
  return url;
}
