import { Lobby } from "./lobby.js";

class LobbyManager {
    static nextLobbyId = 1;
    constructor() {
        this.lobbies = new Map();
    }

    createLobby(maxPlayer = 6) {
        const newLobby = new Lobby(LobbyManager.nextLobbyId, maxPlayer);
        this.lobbies.set(newLobby.id, newLobby);
        LobbyManager.nextLobbyId++;
        return newLobby;
    }

    getLobby(id) {
        return this.lobbies.get(parseInt(id));
    }
}

//Only one manager is required so that object will be created in here.
export const lobbyManager = new LobbyManager();
