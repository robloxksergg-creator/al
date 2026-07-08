import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { works, categories, type Work } from "@/content/portfolio";
import { X, BadgeCheck } from "lucide-react";
import { useLang, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Портфолио — Live 3D" },
      { name: "description", content: "3D-работы: персонажи, окружения, пропсы и анимации." },
    ],
  }),
  component: Portfolio,
});

type Filter = (typeof categories)[number] | "Официальные";
const filterList: Filter[] = ["Все", "Официальные", ...categories.filter((c) => c !== "Все")];

// Соответствие внутренних значений и ключей перевода
const catKey: Record<Filter, TKey> = {
  "Все":         "pf.all",
  "Официальные": "pf.official",
  "Персонажи":   "pf.cat.chars",
  "Окружение":   "pf.cat.env",
  "Пропсы":      "pf.cat.props",
  "Анимация":    "pf.cat.anim",
};

function Portfolio() {
  const { t } = useLang();
  const [cat, setCat] = useState<Filter>("Все");
  const [active, setActive] = useState<Work | null>(null);

  const filtered =
    cat === "Все"
      ? works
      : cat === "Официальные"
        ? works.filter((w) => w.official)
        : works.filter((w) => w.category === cat);



  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {t("pf.title")} <span className="text-gradient">3D</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-xl">{t("pf.subtitle")}</p>

      {/* Filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filterList.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm transition inline-flex items-center gap-1.5 ${
              cat === c
                ? "bg-primary text-primary-foreground shadow-[0_6px_20px_-6px_var(--sun)]"
                : "glass hover:bg-white text-muted-foreground"
            }`}
          >
            {c === "Официальные" && <BadgeCheck className="w-3.5 h-3.5" />}
            {t(catKey[c])}
          </button>
        ))}
      </div>

      {/* Masonry-ish responsive grid */}
      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w, i) => (
          <button
            key={w.id}
            onClick={() => setActive(w)}
            className={`tilt-card glass glow-border rounded-2xl overflow-hidden text-left group relative ${
              i % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""
            }`}
          >
            {w.official && (
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary/95 text-primary-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-md">
                <BadgeCheck className="w-3 h-3" />
                Official
              </div>
            )}
            <div className={`overflow-hidden ${i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              <img
                src={w.image}
                alt={w.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-primary uppercase tracking-wider">{t(catKey[w.category])}</div>
                <div className="mt-0.5 font-semibold">{w.title}</div>
                {w.client && (
                  <div className="text-xs text-muted-foreground mt-0.5">{t("pf.for")} {w.client}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>


      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center">
              <div className="text-xs text-primary uppercase tracking-wider">{t(catKey[active.category])}</div>
              <div className="text-xl font-semibold">{active.title}</div>
              {active.description && (
                <div className="mt-1 text-sm text-muted-foreground max-w-xl">{active.description}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
