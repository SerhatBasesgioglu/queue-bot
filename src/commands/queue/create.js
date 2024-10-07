import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} from "@discordjs/builders";
import { ButtonStyle, SlashCommandBuilder } from "discord.js";
import lobbyManager from "../../classes/lobbyManager.js";

export const data = new SlashCommandBuilder()
    .setName("create")
    .setDescription("Creates a new game lobby");

export async function execute(interaction) {
    let lobby = lobbyManager.createLobby();

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Title")
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
        .setCustomId(`lobby_state_${lobby.id}`)
        .setLabel("Status")
        .setStyle(ButtonStyle.Secondary);

    const actionRow = new ActionRowBuilder().addComponents(
        joinButton,
        leaveButton,
        statusButton,
    );

    interaction.reply({ embeds: [embed], components: [actionRow] });
}
