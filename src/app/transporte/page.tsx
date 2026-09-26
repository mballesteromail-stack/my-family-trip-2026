import Link from "next/link";
import { transport } from "@/data/itinerary";
import Callout from "@/components/Callout";
import EditableText from "@/components/EditableText";

export default function TransportPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Transporte y datos fijos</h1>

      <a
        href="https://new.mta.info"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow"
      >
        🚇 Abrir MTA (app o web)
      </a>
      <p className="mt-1 text-center text-xs text-slate-400">
        Si tenés la app MYmta instalada en el iPhone, este link la abre directo. Si
        no, abre el estado del servicio en la web.
      </p>
      <a
        href="https://apps.apple.com/us/search?term=mta%20subway%20bus"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 block text-center text-xs text-brand-600 underline"
      >
        ¿No se abrió la app? Buscarla en la App Store
      </a>

      <ul className="mt-4 space-y-2">
        {transport.fixedRules.map((rule, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <EditableText id={`transport-rule-${i}`} defaultText={rule} className="text-sm text-slate-700" />
          </li>
        ))}
      </ul>

      <h2 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Lo que no es subte
      </h2>
      <Callout>
        <EditableText id="transport-special" defaultText={transport.specialSegments} as="span" />
      </Callout>
    </main>
  );
}
