import { notFound } from "next/navigation";
import Link from "next/link";
import { days } from "@/data/itinerary";
import ChecklistItem from "@/components/ChecklistItem";
import Callout from "@/components/Callout";

export function generateStaticParams() {
  return days.map((day) => ({ fecha: day.id }));
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ fecha: string }>;
}) {
  const { fecha } = await params;
  const day = days.find((d) => d.id === fecha);
  if (!day) notFound();

  const index = days.findIndex((d) => d.id === day.id);
  const prev = days[index - 1];
  const next = days[index + 1];

  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">{day.title}</h1>
      <p className="text-sm text-slate-400">{day.date}</p>
      {day.subtitle && <p className="mt-1 text-sm text-slate-600">{day.subtitle}</p>}

      {day.howToGetThere && (
        <div className="mt-3">
          <Callout>🚇 {day.howToGetThere}</Callout>
        </div>
      )}

      <h2 className="mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Plan del día
      </h2>
      <ul className="space-y-2">
        {day.activities.map((a) => (
          <ChecklistItem key={a.id} id={a.id} time={a.time} title={a.text} />
        ))}
      </ul>

      {day.longNote && (
        <div className="mt-4">
          <Callout>{day.longNote}</Callout>
        </div>
      )}

      {day.eating && (
        <div className="mt-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Dónde comer
          </h2>
          <p className="text-sm text-slate-700">{day.eating}</p>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
        💰 {day.ticketsNote}
      </div>

      <div className="mt-6 flex justify-between text-sm">
        {prev ? (
          <Link href={`/dia/${prev.id}`} className="text-brand-600">
            ← {prev.weekday}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/dia/${next.id}`} className="text-brand-600">
            {next.weekday} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
