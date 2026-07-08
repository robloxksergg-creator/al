import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, works, socials } from "@/content/portfolio";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Daisy } from "@/components/AnimatedBackground";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useLang();
  const featured = works.slice(0, 3);
  return (
    <div>
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-28 md:pt-24 md:pb-36 text-center">
        {/* Декоративная ромашка */}
        <div className="absolute top-8 left-4 md:left-16 w-20 h-20 md:w-28 md:h-28 opacity-25 pointer-events-none sway">
          <Daisy size={112} />
        </div>
        <div className="absolute top-24 right-4 md:right-20 w-14 h-14 opacity-20 pointer-events-none sway" style={{ animationDelay: "-2s" }}>
          <Daisy size={80} />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          {t("hero.badge")}
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {t("hero.hi")}
          </p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] tracking-tight">
            {profile.name}.
          </h1>

          <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mt-4 md:mt-6">
            {t("hero.line2")}{" "}
            <span className="text-gradient not-italic">3D</span>
            {t("hero.line3")}
          </h2>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.tagline")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-[0_10px_30px_-8px_oklch(0.6_0.14_5)] hover:scale-105 transition-transform"
            >
              {t("hero.cta.works")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold hover:bg-white transition"
            >
              {t("hero.cta.order")}
            </Link>
            <a
              href={socials.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold hover:bg-white transition"
            >
              Discord
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-foreground">{t("home.featured")}</h2>
          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
            {t("home.all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {featured.map((w, i) => (
            <div
              key={w.id}
              className={`tilt-card glass glow-border rounded-2xl overflow-hidden group ${i === 1 ? "md:mt-10" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-5 text-left">
                <div className="text-xs text-primary uppercase tracking-[0.15em] font-semibold">{w.category}</div>
                <div className="mt-1 font-display text-xl md:text-2xl text-foreground">{w.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
