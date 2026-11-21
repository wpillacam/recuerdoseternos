import "./JorgeFamilyTree.css";

export default function JorgeFamilyTree() {
  return (
    <div className="jft-frame">
      <iframe
        src="/custom/jorge-penado-arbol.html"
        title="Árbol genealógico — Familia Penado Siancas"
        className="jft-frame__iframe"
        loading="lazy"
      />
    </div>
  );
}
