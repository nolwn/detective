export default function parseCommand(command: string) {
	const [action, target] = command.toLocaleLowerCase().split(" ");

	return { action, target };
}
