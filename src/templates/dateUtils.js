export function formatDate(dateStr, lang) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(lang === "en" ? "en-US" : "es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
