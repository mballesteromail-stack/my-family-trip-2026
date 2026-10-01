export default function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* NYC Skyline Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105"
        style={{
          backgroundImage: "url('/images/nyc-bg.jpg')",
        }}
      />

      {/* Atmospheric light gradient overlay for readability and contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-slate-50/60 to-slate-100/85" />
    </div>
  );
}
