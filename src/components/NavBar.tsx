"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/presupuesto", label: "Presup.", icon: "💵" },
  { href: "/transporte", label: "Subte", icon: "🚇" },
  { href: "/comidas", label: "Comidas", icon: "🍽️" },
  { href: "/bucket-list", label: "Lista", icon: "⭐" },
  { href: "/reglas", label: "Reglas", icon: "📌" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/80 bg-white/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)] shadow-lg">
      <ul className="grid grid-cols-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] ${
                  active ? "text-brand-600 font-semibold" : "text-slate-500"
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
