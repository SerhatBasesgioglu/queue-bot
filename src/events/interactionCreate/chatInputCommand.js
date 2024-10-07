export default async function handleCommands(client, interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    await command.execute(interaction);
}
