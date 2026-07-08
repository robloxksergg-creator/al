import { createFileRoute } from "@tanstack/react-router";
import { socials, production } from "@/content/portfolio";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакты — Live 3D" },
      { name: "description", content: "Связаться с Live: Discord и все социальные сети." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const links = [
    { label: t("con.discord"),  url: socials.discord,  hint: t("con.discord.hint") },
    { label: t("con.all"),      url: socials.allLinks, hint: t("con.all.hint") },
    { label: production.name,   url: production.link,  hint: t("con.prod.hint") },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        <span className="text-gradient">{t("con.title")}</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-xl">{t("con.subtitle")}</p>

      <div className="mt-10 grid gap-4">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="tilt-card glass glow-border rounded-2xl p-5 flex items-center justify-between group"
          >
            <div>
              <div className="font-semibold text-lg">{l.label}</div>
              <div className="text-sm text-muted-foreground">{l.hint}</div>
            </div>
            <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
