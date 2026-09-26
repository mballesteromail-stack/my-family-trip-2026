import { notFound } from "next/navigation";
import Link from "next/link";
import { days } from "@/data/itinerary";
import ChecklistItem from "@/components/ChecklistItem";
import Callout from "@/components/Callout";
import EditableText from "@/components/EditableText";
import WeatherBadge from "@/components/WeatherBadge";

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
      <EditableText
        id={`${day.id}-title`}
        defaultText={day.title}
        className="mt-1 block text-xl font-bold text-slate-800"
      />
      <p className="text-sm text-slate-400">{day.date}</p>
      <div className="mt-2">
        <WeatherBadge date={day.id} />
      </div>
      {day.subtitle && (
        <EditableText
          id={`${day.id}-subtitle`}
          defaultText={day.subtitle}
          className="mt-1 block text-sm text-slate-600"
        />
      )}

      {day.howToGetThere && (
        <div className="mt-3">
          <Callout>
            🚇 <EditableText id={`${day.id}-howto`} defaultText={day.howToGetThere} as="span" />
          </Callout>
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
          <Callout>
            <EditableText id={`${day.id}-longnote`} defaultText={day.longNote} as="span" />
          </Callout>
        </div>
      )}

      <div className="mt-4">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          ☔ Plan si llueve
        </h2>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
          <EditableText
            id={`${day.id}-rainplan`}
            defaultText="Sin plan alternativo cargado todavía. Mirá el pronóstico de arriba y anotá acá el plan B si hace falta."
            className="text-sm text-slate-700"
          />
        </div>
      </div>

      {day.eating && (
        <div className="mt-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Dónde comer
          </h2>
          <EditableText
            id={`${day.id}-eating`}
            defaultText={day.eating}
            className="text-sm text-slate-700"
          />
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
        💰 <EditableText id={`${day.id}-tickets`} defaultText={day.ticketsNote} as="span" />
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
