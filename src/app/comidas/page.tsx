import Link from "next/link";
import { mealsByDay, mealsFootnote } from "@/data/itinerary";
import Callout from "@/components/Callout";
import EditableText from "@/components/EditableText";

export default function MealsPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Comidas por día</h1>

      <ul className="mt-4 space-y-3">
        {mealsByDay.map((m, i) => (
          <li key={m.day} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-slate-800">{m.day}</span>
              <span className="text-xs text-slate-400">{m.neighborhood}</span>
            </div>
            <EditableText
              id={`meal-${i}-places`}
              defaultText={m.places}
              className="mt-1 block text-sm text-slate-700"
            />
            <EditableText
              id={`meal-${i}-moment`}
              defaultText={m.moment}
              className="mt-1 block text-xs italic text-slate-400"
            />
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Callout>
          <EditableText id="meals-footnote" defaultText={mealsFootnote} as="span" />
        </Callout>
      </div>
    </main>
  );
}
