import { Link } from "@tanstack/react-router";
import { profile } from "@/content/portfolio";
import { Daisy } from "./AnimatedBackground";
import { Vine } from "./Vine";
import { useLang, type TKey } from "@/lib/i18n";

export function Nav() {
  const { t, lang, setLang } = useLang();

  const links: { to: "/" | "/portfolio" | "/orders" | "/contact"; label: TKey }[] = [
    { to: "/",          label: "nav.home" },
    { to: "/portfolio", label: "nav.portfolio" },
    { to: "/orders",    label: "nav.orders" },
    { to: "/contact",   label: "nav.contact" },
  ];

  return (
    <header className="sticky top-0 z-40">
      {/* Лозы, обвивающие панель сверху */}
      <Vine className="absolute -top-4 left-0 w-full h-14 pointer-events-none z-10" />

      <div className="border-b border-border/50 backdrop-blur-xl bg-background/60 relative">
        {/* Второй ряд лозы — снизу панели, слева и справа маленькие завитки */}
        <Vine className="absolute -bottom-3 left-0 w-1/3 h-8 pointer-events-none opacity-70" />
        <Vine flip className="absolute -bottom-3 right-0 w-1/3 h-8 pointer-events-none opacity-70" />

        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 group-hover:scale-110 transition-transform">
              <Daisy size={36} />
            </div>
            <span className="font-bold text-lg tracking-tight text-gradient">{profile.name}</span>
          </Link>

          <nav className="flex items-center gap-1 md:gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-white transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm rounded-full text-primary-foreground bg-primary" }}
              >
                {t(l.label)}
              </Link>
            ))}

            {/* Переключатель языка */}
            <div className="ml-2 flex items-center gap-0.5 glass rounded-full p-0.5">
              {(["ru", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                    lang === l
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={`Switch language to ${l}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
