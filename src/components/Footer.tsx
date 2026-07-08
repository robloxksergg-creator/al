import { production, socials } from "@/content/portfolio";
import { useLang } from "@/lib/i18n";
import { Vine } from "./Vine";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-border/50 bg-background/60 backdrop-blur-xl relative">
      <Vine className="absolute -top-4 left-0 w-full h-10 pointer-events-none opacity-80" flip />
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground relative">
        <p>
          {t("footer.made")}{" "}
          <a
            href={production.link}
            target="_blank"
            rel="noreferrer"
            className="text-gradient font-semibold hover:opacity-80"
          >
            {production.name}
          </a>
        </p>
        <p>
          {t("footer.links")}{" "}
          <a
            href={socials.allLinks}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {socials.allLinks.replace("https://", "")}
          </a>
        </p>
      </div>
    </footer>
  );
}
