import { fileURLToPath } from "node:url";
import getAllFiles from "../utils/getAllFiles.js";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function registerEvents(client) {
    const eventFolders = getAllFiles(
        path.join(__dirname, "..", "events"),
        true,
    );

    for (const folder of eventFolders) {
        const eventFiles = getAllFiles(folder);
        const eventName = folder.replace(/\\/g, "/").split("/").pop();

        client.on(eventName, async (arg) => {
            for (const file of eventFiles) {
                const eventFunction = await import(file);
                await eventFunction.default(client, arg);
            }
        });
    }
}
