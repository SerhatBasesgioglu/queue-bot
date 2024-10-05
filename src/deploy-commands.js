import { REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const token = process.env.TOKEN;
const clientId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const foldersPath = join(__dirname, "commands");
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  console.log(commandsPath);
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js"),
  );
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
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
})();
