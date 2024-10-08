import { ChannelType, SlashCommandBuilder } from "discord.js";
import queue from "../../classes/queue.js";
import { Player } from "../../classes/player.js";

export const data = new SlashCommandBuilder()
    .setName("join")
    .setDescription("Enter to the queue!");

export async function execute(interaction) {
    const player = new Player(interaction.user.id, interaction.user.username);
    queue.enqueue(player);
    interaction.reply(`${player.name} has entered to the queue`);

    const channel = await interaction.guild.channels.create({
        name: "Test Channel",
        type: ChannelType.GuildText,
        reason: "Test",
    });
    await channel.send("Welcome to the test channel");
}
