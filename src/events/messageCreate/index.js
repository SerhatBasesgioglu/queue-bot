export default async function messageCreate(client, message) {
    if (message.author.bot) return;
    await message.reply("hey");
}
