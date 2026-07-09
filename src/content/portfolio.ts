// ===============================================
// РЕДАКТИРУЙ ЗДЕСЬ — данные для сайта портфолио
// ===============================================
// Чтобы поменять фото работы — просто замени "image" на нужную ссылку
// (можно прямую URL или путь к файлу в public/, например "/works/my.jpg").
// Можно добавлять/удалять объекты в массиве works.

export const profile = {
  name: "Live",
  role: "3D Artist",
  tagline: "Создаю эксклюзивные 3D-сцены, персонажей и окружения.",
  avatar: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=400&fit=crop",
};

export const socials = {
  discord: "https://discord.com/users/490492268063490058",
  allLinks: "https://portaly.cc/LiveEnt",
};

export const production = {
  name: "Flux Production",
  link: "https://discord.gg/sg64A74Ft3",
};

// Категории для фильтра (опционально)
export const categories = ["Все", "Персонажи", "Окружение", "Пропсы", "Анимация"] as const;

const publicPath = import.meta.env.BASE_URL;
const resolveAsset = (path: string) => `${publicPath}${path.replace(/^\//, "")}`;


export type Work = {
  id: string;
  title: string;
  category: (typeof categories)[number];
  image: string;      // <— ссылка на картинку
  video?: string;     // <— опциональная ссылка на видео (mp4/mov)
  description?: string;
  official?: boolean; // <— true = официальная работа (для клиента/студии)
  client?: string;    // <— имя клиента/проекта (опционально)
};

export const works: Work[] = [
  // Загрузка из public/works — сгенерировано автоматически из содержимого C:\Live 3D
  {
    id: "2",
    title: "2",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/2-1200.jpg"),
  },
  {
    id: "31",
    title: "31",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/31-1200.jpg"),
  },
  {
    id: "4",
    title: "4",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/4-1200.jpg"),
  },
  {
    id: "8c23ebf0a315ad3f",
    title: "8c23ebf0a315ad3f",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/8c23ebf0a315ad3f-1200.jpg"),
  },
  {
    id: "9",
    title: "9",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/9-1200.jpg"),
  },
  {
    id: "daily_daily_isaac_items",
    title: "Daily daily isaac items",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/Daily_daily_isaac_items-1200.jpg"),
  },
  {
    id: "image",
    title: "Image",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/image-1200.jpg"),
  },
  {
    id: "liveent-apple-image",
    title: "Liveent Apple",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/liveent-apple-image-1200.jpg"),
  },
  {
    id: "liveent-cherry",
    title: "Liveent Cherry",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/liveent-cherry-1200.jpg"),
  },
  {
    id: "liveent-cookies-romashka",
    title: "Liveent Cookies Romashka",
    category: "Пропсы",
    image: resolveAsset("/works/optimized/liveent-cookies-romashka-1200.jpg"),
  },
  {
    id: "Liveart",
    title: "Liveart",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/Liveart-1200.jpg"),
  },
  {
    id: "MiraKGB1",
    title: "MiraKGB1",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/MiraKGB1-1200.jpg"),
  },
  {
    id: "pawuk",
    title: "Pawuk",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/pawuk-1200.jpg"),
  },
  {
    id: "Snowman",
    title: "Snowman",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/Snowman-1200.jpg"),
  },
  {
    id: "kat",
    title: "kat",
    category: "Персонажи",
    image: resolveAsset("/works/optimized/kat-1200.jpg"),
  },
  // Видео (сгенерированные миниатюры см. public/works/*.jpg)
  {
    id: "Mom-s-Heels",
    title: "Mom's Heels",
    category: "Анимация",
    image: resolveAsset("/works/optimized/Mom-s-Heels-1200.jpg"),
    video: resolveAsset("/works/Mom-s-Heels.mp4"),
  },
  {
    id: "Mom-s-Lipstick",
    title: "Mom's Lipstick",
    category: "Анимация",
    image: resolveAsset("/works/optimized/Mom-s-Lipstick-1200.jpg"),
    video: resolveAsset("/works/Mom-s-Lipstick.mp4"),
  },
  {
    id: "Mom-s-Underwear",
    title: "Mom's Underwear",
    category: "Анимация",
    image: resolveAsset("/works/optimized/Mom-s-Underwear-1200.jpg"),
    video: resolveAsset("/works/Mom-s-Underwear.mp4"),
  },
  {
    id: "Wire-Coat-Hanger",
    title: "Wire Coat Hanger",
    category: "Анимация",
    image: resolveAsset("/works/optimized/Wire-Coat-Hanger-1200.jpg"),
    video: resolveAsset("/works/Wire-Coat-Hanger.mp4"),
  },
];

// Тарифы для страницы заказов
export const orderTiers = [
  {
    name: "Basic",
    price: "от $30",
    features: ["Простая модель", "Базовые текстуры", "1 ревизия", "Срок ~3 дня"],
  },
  {
    name: "Standard",
    price: "от $90",
    features: ["Детализованная модель", "PBR текстуры", "3 ревизии", "Срок ~7 дней"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "от $200",
    features: ["Сцена / персонаж", "Рендер 4K", "Неогр. ревизии", "Срок обсуждается"],
  },
];
