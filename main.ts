import Console from "./console.ts";
import parseCommand from "./parseCommand.ts";

async function main() {
	const c = new Console();
	const question = "Are you a butthole?";
	let running = true;
	let statement = "";

	while (running) {
		const prompts = `${statement}${question}`;
		const answer = await c.ask(prompts);

		const { action } = parseCommand(answer);

		statement = "";

		switch (action) {
			case "quit":
				running = quit(c);
				break;

			case "take":
				break;

			default:
				statement = "I didn't understand that.\n";

				break;
		}
	}
}

function quit(c: Console): boolean {
	const confirmQuit = c.ask("Are you sure you want to quit?");

	if (confirmQuit[0] === "y") {
		return false;
	}

	return true;
}

main();
