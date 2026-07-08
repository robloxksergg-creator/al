import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { orderTiers, socials } from "@/content/portfolio";
import { Check, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Заказы — Live 3D" },
      { name: "description", content: "Заказать 3D-работу: тарифы и форма связи." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", contact: "", tier: "Standard", brief: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Order from ${form.name}\nContact: ${form.contact}\nTier: ${form.tier}\n\n${form.brief}`;
    window.open(socials.discord, "_blank");
    navigator.clipboard?.writeText(text).catch(() => {});
    alert(t("ord.copied"));
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        <span className="text-gradient">{t("ord.title")}</span> {t("ord.title.rest")}
      </h1>
      <p className="mt-3 text-muted-foreground max-w-xl">{t("ord.subtitle")}</p>

      {/* Tiers */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {orderTiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-6 glass glow-border tilt-card ${
              tier.highlight ? "ring-2 ring-primary shadow-[0_15px_40px_-10px_var(--sun)]" : ""
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-6 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {t("ord.popular")}
              </div>
            )}
            <div className="text-lg font-semibold">{tier.name}</div>
            <div className="mt-2 text-3xl font-bold text-gradient">{tier.price}</div>
            <ul className="mt-5 space-y-2 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setForm((s) => ({ ...s, tier: tier.name }))}
              className={`mt-6 w-full rounded-full py-2.5 text-sm font-medium transition ${
                form.tier === tier.name
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-white"
              }`}
            >
              {form.tier === tier.name ? t("ord.selected") : t("ord.select")}
            </button>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={submit} className="mt-14 glass glow-border rounded-2xl p-6 md:p-8 max-w-3xl">
        <h2 className="text-2xl font-bold">{t("ord.brief")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("ord.name")}</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg bg-input/50 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("ord.contact")}</span>
            <input
              required
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="rounded-lg bg-input/50 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("ord.tier")}</span>
          <select
            value={form.tier}
            onChange={(e) => setForm({ ...form, tier: e.target.value })}
            className="rounded-lg bg-input/50 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {orderTiers.map((tier) => (
              <option key={tier.name} value={tier.name}>
                {tier.name} — {tier.price}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("ord.desc")}</span>
          <textarea
            required
            rows={5}
            value={form.brief}
            onChange={(e) => setForm({ ...form, brief: e.target.value })}
            className="rounded-lg bg-input/50 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder={t("ord.desc.ph")}
          />
        </label>
        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium shadow-[0_10px_30px_-8px_var(--sun)] hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4" /> {t("ord.send")}
        </button>
      </form>
    </div>
  );
}
