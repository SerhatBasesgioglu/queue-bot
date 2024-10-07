import LobbyStatus from "../enums/lobbyStatus.js";

export class Lobby {
    constructor(id, maxPlayer = 6) {
        this.id = id;
        this.members = new Set();
        this.status = "open";
        this.createdTime = new Date();
        this.maxPlayer = maxPlayer;
        console.log(`Lobby with id ${this.id} has been created!`);
    }

    getMembers() {
        return this.members;
    }

    getCount() {
        return this.members.length;
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
}
