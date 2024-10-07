import lobbyManager from "../../classes/lobbyManager.js";
import LobbyStatus from "../../enums/lobbyStatus.js";

export default async function handleButtonInteraction(_, interaction) {
    if (!interaction.isButton()) return;

    const lobbyId = interaction.customId.split("_")[2];
    const lobby = lobbyManager.getLobby(lobbyId);

    if (!lobby) {
        await interaction.reply({
            content: "This lobby does not exist",
            ephemeral: true,
        });
        return;
    }

    if (interaction.customId.startsWith("join_lobby")) {
        const status = lobby.addMember(interaction.user.id);
        let message = {
            content: "",
            ephemeral: true,
        };

        switch (status) {
            case LobbyStatus.LOBBY_IS_FULL:
                message.content = "This lobby is full!";
                break;
            case LobbyStatus.ALREADY_IN_LOBBY:
                message.content = "You are already in this lobby";
                break;
            case LobbyStatus.SUCCESS:
                message.content = "Succesfully joined to lobby!";
                break;
            default:
                message.content = "Unknown error";
                break;
        }
        await interaction.reply(message);
    }

    if (interaction.customId.startsWith("leave_lobby")) {
        const status = lobby.removeMember(interaction.user.id);
        let message = {
            content: "",
            ephemeral: true,
        };

        switch (status) {
            case LobbyStatus.NOT_IN_LOBBY:
                message.content = "You are not in this lobby";
                break;
            case LobbyStatus.SUCCESS:
                message.content = "You left the lobby!";
                break;
            default:
                message.content = "Unknown error";
                break;
        }
        await interaction.reply(message);
    }

    if (interaction.customId.startsWith("lobby_status")) {
        await interaction.reply({
            content: `Lobby status: ${lobby.getCount()}/6`,
            ephemeral: true,
        });
    }
}
