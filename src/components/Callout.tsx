export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-brand-50/90 backdrop-blur-sm border border-brand-100/80 p-3 text-sm text-slate-700 shadow-xs">
      {children}
    </div>
  );
}
