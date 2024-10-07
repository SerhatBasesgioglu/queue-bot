import { Lobby } from "./lobby.js";

class LobbyManager {
    constructor() {
        this.lobbyList = [];
    }

    create() {
        const lobby = new Lobby();
        this.lobbyCount++;
    }
}

//Only one manager is required so that object will be created in here.
const lobbyManager = new LobbyManager();
export default lobbyManager;
