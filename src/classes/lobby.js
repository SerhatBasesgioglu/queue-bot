import LobbyState from "../enums/lobbyState.js";
import LobbyStatus from "../enums/lobbyStatus.js";

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
}
