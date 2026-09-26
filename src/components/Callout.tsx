export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-sm text-slate-700">
      {children}
    </div>
  );
}
