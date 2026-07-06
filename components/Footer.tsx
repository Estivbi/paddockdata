export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-text-muted sm:px-6">
        <p>
          PaddockData no está afiliado a la Fórmula 1, la FIA ni a los
          promotores de los circuitos. Fechas y horarios sujetos a cambios por
          parte de la organización oficial.
        </p>
        <p className="mt-2">
          PaddockData participa en el programa de afiliados de Amazon y en
          otros programas de afiliación (como servicios VPN): puede recibir
          una comisión por las compras o contrataciones que cumplan los
          requisitos realizadas a través de los enlaces de esta web. Los
          canales oficiales de retransmisión se muestran sin ningún tipo de
          comisión.
        </p>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} PaddockData
        </p>
      </div>
    </footer>
  );
}
