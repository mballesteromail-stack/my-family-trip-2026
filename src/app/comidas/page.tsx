import Link from "next/link";
import { mealsByDay, mealsFootnote } from "@/data/itinerary";
import Callout from "@/components/Callout";

export default function MealsPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Comidas por día</h1>

      <ul className="mt-4 space-y-3">
        {mealsByDay.map((m) => (
          <li key={m.day} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-slate-800">{m.day}</span>
              <span className="text-xs text-slate-400">{m.neighborhood}</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">{m.places}</p>
            <p className="mt-1 text-xs italic text-slate-400">{m.moment}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Callout>{mealsFootnote}</Callout>
      </div>
    </main>
  );
}
