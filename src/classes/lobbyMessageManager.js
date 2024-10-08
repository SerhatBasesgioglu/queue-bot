import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} from "discord.js";

export class LobbyMessageManager {
    constructor(lobby) {
        this.lobby = lobby;
        this.messageId = null;
    }

    createMessage() {
        const memberList = Array.from(this.lobby.getMembers());
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(
                `${this.lobby.maxPlayer / 2}v${this.lobby.maxPlayer / 2} Lobby`,
            )
            .setDescription("Description")
            .addFields(
                { name: "Lobby Status", value: `${this.lobby.state}` },
                {
                    name: "Players",
                    value:
                        memberList.length > 0
                            ? memberList.join(", ")
                            : "No members",
                },
            );

        const joinButton = new ButtonBuilder()
            .setCustomId(`join_lobby_${this.lobby.id}`)
            .setLabel("Join lobby")
            .setStyle(ButtonStyle.Primary);

        const leaveButton = new ButtonBuilder()
            .setCustomId(`leave_lobby_${this.lobby.id}`)
            .setLabel("Leave lobby")
            .setStyle(ButtonStyle.Danger);

        const statusButton = new ButtonBuilder()
            .setCustomId(`lobby_status_${this.lobby.id}`)
            .setLabel("Status")
            .setStyle(ButtonStyle.Secondary);

        const actionRow = new ActionRowBuilder().addComponents(
            joinButton,
            leaveButton,
            statusButton,
        );
        return { embeds: [embed], components: [actionRow] };
    }

    async sendMessage(channel) {
        const message = this.createMessage();
        const messageRef = await channel.send(message);
        this.messageId = messageRef.id;
    }

    async updateMessage(channel) {
        if (!this.messageId) return;
        const updatedMessage = this.createMessage();
        const messageRef = await channel.messages.fetch(this.messageId);
        await messageRef.edit(updatedMessage);
    }
}
