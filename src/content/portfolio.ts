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
  discord: "https://discord.gg/4jpdMN8udx",
  allLinks: "https://portaly.cc/LiveEnt",
};

export const production = {
  name: "Flux Production",
  link: "https://discord.gg/sg64A74Ft3",
};

// Категории для фильтра (опционально)
export const categories = ["Все", "Персонажи", "Окружение", "Пропсы", "Анимация"] as const;

export type Work = {
  id: string;
  title: string;
  category: (typeof categories)[number];
  image: string;      // <— ссылка на картинку
  description?: string;
  official?: boolean; // <— true = официальная работа (для клиента/студии)
  client?: string;    // <— имя клиента/проекта (опционально)
};

export const works: Work[] = [
  {
    id: "1",
    title: "Neon Warrior",
    category: "Персонажи",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=1200&h=900&fit=crop",
    description: "Стилизованный персонаж в киберпанк-эстетике.",
    official: true,
    client: "Flux Production",
  },
  {
    id: "2",
    title: "Ancient Ruins",
    category: "Окружение",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1200&h=900&fit=crop",
    description: "Пейзаж с разрушенным храмом, освещение sunset.",
  },
  {
    id: "3",
    title: "Sci-Fi Blaster",
    category: "Пропсы",
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=1200&h=900&fit=crop",
    description: "High-poly модель бластера с PBR-текстурами.",
    official: true,
    client: "Private commission",
  },
  {
    id: "4",
    title: "Forest Spirit",
    category: "Персонажи",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=900&fit=crop",
    description: "Мифический персонаж, стилизованный шейдинг.",
  },
  {
    id: "5",
    title: "Cyber Alley",
    category: "Окружение",
    image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=1200&h=900&fit=crop",
    description: "Ночная улица, атмосферный fog и неон.",
  },
  {
    id: "6",
    title: "Loop Animation",
    category: "Анимация",

    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=900&fit=crop",
    description: "Зацикленная анимация абстрактного объекта.",
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
