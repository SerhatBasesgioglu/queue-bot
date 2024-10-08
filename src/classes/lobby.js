import LobbyState from "../enums/lobbyState.js";
import LobbyStatus from "../enums/lobbyStatus.js";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} from "discord.js";

export class Lobby {
    constructor(id, maxPlayer = 6) {
        this.id = id;
        this.members = new Set();
        this.state = LobbyState.QUEUE;
        this.createdTime = new Date();
        this.maxPlayer = maxPlayer;
        console.log(`Lobby with id ${this.id} has been created!`);
    }

    getMembers() {
        return this.members;
    }

    getCount() {
        return this.members.size;
    }

    addMember(memberId) {
        if (this.getCount() >= this.maxPlayer) return LobbyStatus.LOBBY_IS_FULL;
        if (this.members.has(memberId)) return LobbyStatus.ALREADY_IN_LOBBY;
        this.members.add(memberId);
        return LobbyStatus.SUCCESS;
    }

    removeMember(memberId) {
        if (!this.members.has(memberId)) return LobbyStatus.NOT_IN_LOBBY;
        this.members.delete(memberId);
        return LobbyStatus.SUCCESS;
    }

    startCaptainSelection() {
        this.state = LobbyState.CAPTAIN_SELECTION;
    }

    startMapSelection() {
        this.state = LobbyState.MAP_SELECTION;
    }

    startGame() {
        this.state = LobbyState.GAME;
    }

    endGame() {
        this.state = LobbyState.END_SCREEN;
    }

    createMessage() {
        const memberList = Array.from(this.getMembers());
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`${this.maxPlayer / 2}v${this.maxPlayer / 2} Lobby`)
            .addFields(
                { name: `Lobby Status: ${this.state}`, value: ` ` },
                {
                    name: "Players",
                    value:
                        memberList.length > 0
                            ? memberList.join(", ")
                            : "No members",
                },
            );

        const joinButton = new ButtonBuilder()
            .setCustomId(`join_lobby_${this.id}`)
            .setLabel("Join lobby")
            .setStyle(ButtonStyle.Primary);

        const leaveButton = new ButtonBuilder()
            .setCustomId(`leave_lobby_${this.id}`)
            .setLabel("Leave lobby")
            .setStyle(ButtonStyle.Danger);

        const statusButton = new ButtonBuilder()
            .setCustomId(`lobby_status_${this.id}`)
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
