import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("join")
    .setDescription("Create a queue!");

export async function execute(interaction) {
    await interaction.reply("A queue has been created");
}
