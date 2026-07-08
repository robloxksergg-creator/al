import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

type Dict = Record<string, { ru: string; en: string }>;

// ============ ПЕРЕВОДЫ — редактируй тут ============
export const dict = {
  "nav.home":       { ru: "Начало",      en: "Home" },
  "nav.portfolio":  { ru: "Портфолио",   en: "Portfolio" },
  "nav.orders":     { ru: "Заказы",      en: "Orders" },
  "nav.contact":    { ru: "Контакты",    en: "Contact" },

  "hero.badge":     { ru: "3D Художник · Доступен для заказов", en: "3D Artist · Available for commissions" },
  "hero.hi":        { ru: "Привет, я",   en: "Hi, I'm" },
  "hero.line2":     { ru: "Делаю",       en: "I make" },
  "hero.line3":     { ru: ", которое запоминают.", en: " that gets remembered." },
  "hero.tagline":   { ru: "Создаю эксклюзивные 3D-сцены, персонажей и окружения.",
                      en: "I craft exclusive 3D scenes, characters and environments." },
  "hero.cta.works": { ru: "Смотреть работы", en: "View works" },
  "hero.cta.order": { ru: "Заказать работу", en: "Order a work" },

  "home.featured":  { ru: "Избранные работы", en: "Featured works" },
  "home.all":       { ru: "Все работы",   en: "All works" },

  "pf.title":       { ru: "Портфолио",    en: "Portfolio" },
  "pf.subtitle":    { ru: "Кликни по работе, чтобы посмотреть в полном размере.",
                      en: "Click a work to view it full size." },
  "pf.official":    { ru: "Официальные",  en: "Official" },
  "pf.all":         { ru: "Все",          en: "All" },
  "pf.cat.chars":   { ru: "Персонажи",    en: "Characters" },
  "pf.cat.env":     { ru: "Окружение",    en: "Environments" },
  "pf.cat.props":   { ru: "Пропсы",       en: "Props" },
  "pf.cat.anim":    { ru: "Анимация",     en: "Animation" },
  "pf.for":         { ru: "для",          en: "for" },

  "ord.title":      { ru: "Заказать",     en: "Order" },
  "ord.title.rest": { ru: "работу",       en: "a work" },
  "ord.subtitle":   { ru: "Выбери подходящий тариф или опиши задачу — вернусь с деталями в Discord.",
                      en: "Pick a tier or describe your task — I'll get back to you in Discord." },
  "ord.popular":    { ru: "Популярный",   en: "Popular" },
  "ord.selected":   { ru: "Выбрано",      en: "Selected" },
  "ord.select":     { ru: "Выбрать",      en: "Select" },
  "ord.brief":      { ru: "Бриф заказа",  en: "Order brief" },
  "ord.name":       { ru: "Имя",          en: "Name" },
  "ord.contact":    { ru: "Контакт (Discord/Email)", en: "Contact (Discord/Email)" },
  "ord.tier":       { ru: "Тариф",        en: "Tier" },
  "ord.desc":       { ru: "Описание задачи", en: "Task description" },
  "ord.desc.ph":    { ru: "Что нужно сделать? Референсы, сроки, стилистика...",
                      en: "What do you need? References, deadline, style..." },
  "ord.send":       { ru: "Отправить в Discord", en: "Send to Discord" },
  "ord.copied":     { ru: "Заявка скопирована в буфер обмена. Открыл Discord — вставь сообщение автору.",
                      en: "Request copied to clipboard. Discord opened — paste the message to the author." },

  "con.title":      { ru: "Связаться",    en: "Get in touch" },
  "con.subtitle":   { ru: "Пиши в Discord — отвечаю быстро. Ниже — все мои соц. сети.",
                      en: "Reach out on Discord — I reply fast. All my socials below." },
  "con.discord":    { ru: "Discord (основной)", en: "Discord (main)" },
  "con.discord.hint": { ru: "Быстрый ответ",  en: "Fast reply" },
  "con.all":        { ru: "Все ссылки на меня", en: "All my links" },
  "con.all.hint":   { ru: "Portaly",       en: "Portaly" },
  "con.prod.hint":  { ru: "Production Discord", en: "Production Discord" },

  "footer.made":    { ru: "Сайт сделан под", en: "Site made for" },
  "footer.links":   { ru: "Все ссылки на меня:", en: "All my links:" },
} satisfies Dict;

export type TKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ru" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: TKey) => dict[k]?.[lang] ?? k;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
