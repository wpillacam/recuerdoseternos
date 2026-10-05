// Devuelve el campo "<field>_qu" de un registro cuando el idioma activo es
// quechua y ese campo tiene contenido; si no, cae de vuelta al campo en
// espaniol. Asi, un memorial sin traduccion (por ejemplo, de un cliente real)
// sigue mostrandose con normalidad en espaniol.
export function loc(obj, field, lang) {
  if (!obj) return "";
  if (lang === "qu") {
    const quValue = obj[`${field}_qu`];
    if (quValue) return quValue;
  }
  return obj[field] ?? "";
}
