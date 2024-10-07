import { Lobby } from "./lobby.js";

class LobbyManager {
    static nextLobbyId = 1;
    constructor() {
        this.lobbies = new Map();
    }

    createLobby() {
        const newLobby = new Lobby(LobbyManager.nextLobbyId);
        this.lobbies.set(newLobby.id, newLobby);
        LobbyManager.nextLobbyId++;
        return newLobby;
    }

    getLobby(id) {
        return this.lobbies.get(parseInt(id));
    }
}

//Only one manager is required so that object will be created in here.
const lobbyManager = new LobbyManager();
export default lobbyManager;
