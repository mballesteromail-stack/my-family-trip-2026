"use client";

import Link from "next/link";
import { days, trip } from "@/data/itinerary";
import { useWeather, weatherEmoji } from "@/hooks/useWeather";

export default function HomePage() {
  const { data: weather } = useWeather();
  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold text-slate-800">{trip.title}</h1>
      <p className="text-sm text-slate-500">{trip.subtitle}</p>
      <p className="mt-1 text-xs text-slate-400">{trip.dateRange}</p>
      <p className="mt-1 text-xs text-slate-400">{trip.party}</p>

      <div className="mt-3 rounded-xl bg-amber-50/90 backdrop-blur-sm border border-amber-200/80 p-3 text-sm text-amber-800 shadow-sm">
        🎭 {trip.broadway}
      </div>

      <h2 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 font-medium">
        Día por día
      </h2>
      <ul className="space-y-2">
        {days.map((day) => {
          const w = weather[day.id];
          return (
            <li key={day.id}>
              <Link
                href={`/dia/${day.id}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-3 shadow-sm transition-all hover:bg-white active:scale-[0.99]"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-brand-600">{day.weekday}</div>
                  <div className="text-sm font-medium text-slate-800">{day.title}</div>
                  {day.subtitle && (
                    <div className="text-xs text-slate-400">{day.subtitle}</div>
                  )}
                </div>
                {w && (
                  <div className="shrink-0 text-right text-xs text-slate-500">
                    <div className="text-lg leading-none">{weatherEmoji(w.code)}</div>
                    {Math.round(w.tempMax)}°
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
