"use client";

import { useWeather, weatherEmoji } from "@/hooks/useWeather";

export default function WeatherBadge({ date }: { date: string }) {
  const { data, loading } = useWeather();
  const w = data[date];

  if (loading) {
    return <span className="text-xs text-slate-400">Cargando clima…</span>;
  }

  if (!w) {
    return (
      <span className="text-xs text-slate-400">
        Pronóstico no disponible todavía para este día.
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
      <span className="text-xl">{weatherEmoji(w.code)}</span>
      <span className="font-semibold text-slate-800">
        {Math.round(w.tempMax)}° / {Math.round(w.tempMin)}°F
      </span>
      <span className="text-xs text-slate-500">☔ {Math.round(w.precipProb)}% de lluvia</span>
    </div>
  );
}
