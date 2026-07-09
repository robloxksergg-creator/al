import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/zakazi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhook = process.env.DISCORD_WEBHOOK;

        if (!webhook) {
          return new Response("Webhook not configured", { status: 500 });
        }

        const data = await request.json();

        const embed = {
          embeds: [
            {
              title: "📦 Новый заказ",
              color: 0x57f287,
              fields: [
                {
                  name: "👤 Имя",
                  value: data.name || "Не указано",
                  inline: true,
                },
                {
                  name: "💬 Контакт",
                  value: data.discord || "Не указан",
                  inline: true,
                },
                {
                  name: "🛠 Тариф",
                  value: data.service || "Не выбран",
                },
                {
                  name: "📝 Описание",
                  value: data.description || "Нет описания",
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        };

        const res = await fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(embed),
        });

        if (!res.ok) {
          return new Response("Discord error", { status: 500 });
        }

        return Response.json({ success: true });
      },
    },
  },
});