import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("This command tests whether bot is responsive or not");

export async function execute(interaction) {
    await interaction.reply("Bot is alive and kicking!");
}
