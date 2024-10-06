import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import registerCommands from "./handlers/commandHandler.js";
import registerEvents from "./handlers/eventHandler.js";
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

registerCommands(client);
registerEvents(client);

client.login(process.env.TOKEN);
