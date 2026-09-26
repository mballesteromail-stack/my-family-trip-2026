import Link from "next/link";
import { days, trip } from "@/data/itinerary";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold text-slate-800">{trip.title}</h1>
      <p className="text-sm text-slate-500">{trip.subtitle}</p>
      <p className="mt-1 text-xs text-slate-400">{trip.dateRange}</p>
      <p className="mt-1 text-xs text-slate-400">{trip.party}</p>

      <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
        🎭 {trip.broadway}
      </div>

      <h2 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Día por día
      </h2>
      <ul className="space-y-2">
        {days.map((day) => (
          <li key={day.id}>
            <Link
              href={`/dia/${day.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-3 shadow-sm active:scale-[0.99]"
            >
              <div className="text-xs font-semibold text-brand-600">{day.weekday}</div>
              <div className="text-sm font-medium text-slate-800">{day.title}</div>
              {day.subtitle && (
                <div className="text-xs text-slate-400">{day.subtitle}</div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
