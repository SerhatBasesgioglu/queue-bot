import { fileURLToPath } from "node:url";
import getAllFiles from "../utils/getAllFiles.js";
import path, { dirname } from "node:path";
import { Collection } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function registerCommands(client) {
    client.commands = new Collection();
    const commandFoldersPath = path.join(__dirname, "..", "commands");
    const commandFolders = getAllFiles(commandFoldersPath, true);

    for (const folder of commandFolders) {
        const commandFiles = getAllFiles(folder);

        for (const file of commandFiles) {
            const command = await import(file);

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${command} is missing a required "data" or "execute" property.`,
                );
            }
        }
    }
}
