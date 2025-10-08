require('dotenv').config();

const  { Bot } =  require("grammy")
const  ping = require("ping")

const BOT_TOKEN = process.env.BOT_TOKEN_IP_PING_BBOT
console.log(BOT_TOKEN)
const bot = new Bot(BOT_TOKEN)

bot.command("start", (ctx) => {
  ctx.reply(`🌐 Бот для проверки IP\n\nОтправьте IP или домен для проверки доступности\n\nПример:\n8.8.8.8\ngoogle.com\n192.168.1.1`)
})

bot.on("message:text", async (ctx) => {
  const host = ctx.message.text.trim()
  try {
        const result = await ping.promise.probe(host, {
            timeout: 5,
            extra: ['-n', '4']
        });

        if (result.alive) {
            await ctx.reply(`✅ ${host} - ДОСТУПЕН\nВремя ответа: ${result.time}ms`);
        } else {
            await ctx.reply(`❌ ${host} - НЕДОСТУПЕН`);
        }
    } catch (error) {
        await ctx.reply(`❌ Ошибка при проверке ${host}`);
    }
});

bot.start();
console.log('🤖 Простой бот запущен!');
