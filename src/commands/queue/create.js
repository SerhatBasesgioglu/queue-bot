import { SlashCommandBuilder } from "discord.js";
import lobbyManager from "../../classes/lobbyManager.js";

export const data = new SlashCommandBuilder()
    .setName("create")
    .setDescription("Creates a new game lobby")
    .addIntegerOption((option) =>
        option
            .setName("player_count")
            .setDescription("count")
            .setRequired(true)
            .addChoices(
                { name: "2", value: 2 },
                { name: "4", value: 4 },
                { name: "6", value: 6 },
                { name: "8", value: 8 },
                { name: "10", value: 10 },
            ),
    );

export async function execute(interaction) {
    const maxPlayer = interaction.options.getInteger("player_count");
    const lobby = lobbyManager.createLobby(maxPlayer);
    lobby.sendMessage(interaction.channel);
    const replyMessage = await interaction.reply({
        content: "Lobby has been created",
        ephemeral: false,
        fetchReply: true,
    });

    setTimeout(() => {
        replyMessage.delete().catch(console.error);
    }, 5000);
}
