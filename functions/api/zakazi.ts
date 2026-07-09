export async function onRequestPost(context: any) {
  const webhook = context.env.DISCORD_WEBHOOK;

  if (!webhook) {
    return new Response("Webhook не настроен", { status: 500 });
  }

  const data = await context.request.json();

  const message = {
    embeds: [
      {
        title: "📦 Новый заказ",
        color: 0x57F287,
        fields: [
          {
            name: "👤 Имя",
            value: data.name || "Не указано",
            inline: true,
          },
          {
            name: "💬 Discord",
            value: data.discord || "Не указан",
            inline: true,
          },
          {
            name: "🛠 Услуга",
            value: data.service || "Не указана",
          },
          {
            name: "💰 Бюджет",
            value: data.budget || "Не указан",
            inline: true,
          },
          {
            name: "📅 Срок",
            value: data.deadline || "Не указан",
            inline: true,
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

  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  return Response.json({
    success: true,
  });
}