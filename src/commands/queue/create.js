import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} from "@discordjs/builders";
import { ButtonStyle, SlashCommandBuilder } from "discord.js";
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
    let maxPlayer = interaction.options.getInteger("player_count");
    let lobby = lobbyManager.createLobby(maxPlayer);

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${maxPlayer / 2}v${maxPlayer / 2} Lobby`)
        .setDescription("Description");

    const joinButton = new ButtonBuilder()
        .setCustomId(`join_lobby_${lobby.id}`)
        .setLabel("Join lobby")
        .setStyle(ButtonStyle.Primary);

    const leaveButton = new ButtonBuilder()
        .setCustomId(`leave_lobby_${lobby.id}`)
        .setLabel("Leave lobby")
        .setStyle(ButtonStyle.Danger);

    const statusButton = new ButtonBuilder()
        .setCustomId(`lobby_status_${lobby.id}`)
        .setLabel("Status")
        .setStyle(ButtonStyle.Secondary);

    const actionRow = new ActionRowBuilder().addComponents(
        joinButton,
        leaveButton,
        statusButton,
    );

    interaction.reply({ embeds: [embed], components: [actionRow] });
}
