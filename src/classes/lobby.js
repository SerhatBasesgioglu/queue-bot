export class Lobby {
    constructor(id, maxPlayer = 6) {
        this.id = id;
        this.members = [];
        this.status = "open";
        this.createdTime = new Date();
        this.maxPlayer = maxPlayer;
    }

    isFull() {
        if (this.playerCount < this.maxPlayer) return false;
        return true;
    }

    getMembers() {
        return this.members;
    }

    addMember() {}

    removeMember() {}
}
