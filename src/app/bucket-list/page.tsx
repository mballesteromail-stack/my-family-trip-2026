import Link from "next/link";
import { bucketList } from "@/data/itinerary";
import ChecklistItem from "@/components/ChecklistItem";

export default function BucketListPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Bucket list</h1>

      <h2 className="mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Ya está en el plan
      </h2>
      <ul className="space-y-2">
        {bucketList.alreadyPlanned.map((b, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
            <span className="text-slate-800">{b.item}</span>
            <div className="text-xs text-brand-600">{b.day}</div>
          </li>
        ))}
      </ul>

      <h2 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Fácil de sumar
      </h2>
      <ul className="space-y-2">
        {bucketList.easyToAdd.map((b) => (
          <ChecklistItem key={b.id} id={b.id} title={b.item} />
        ))}
      </ul>

      <h2 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        No entra en estos 8 días
      </h2>
      <ul className="space-y-2">
        {bucketList.notFitting.map((b, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
            {b}
          </li>
        ))}
      </ul>
    </main>
  );
}
