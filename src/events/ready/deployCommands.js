import { REST, Routes } from "discord.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import dotenv from "dotenv";
import getAllFiles from "../../utils/getAllFiles.js";

export default async function deployCommands() {
    dotenv.config();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const token = process.env.TOKEN;
    const clientId = process.env.APP_ID;
    const guildId = process.env.GUILD_ID;

    const commands = [];

    const commandFolders = getAllFiles(
        join(__dirname, "..", "..", "commands"),
        true,
    );

    for (const folder of commandFolders) {
        const commandFiles = getAllFiles(folder);

        for (const file of commandFiles) {
            const command = await import(file);
            if ("data" in command && "execute" in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                );
            }
        }
    }

    const rest = new REST().setToken(token);

    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`,
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}
