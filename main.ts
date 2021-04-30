import User from "./User.ts";
import Scene from "./Scene.ts";
import { hall } from "./data/data.ts";
import parseCommand from "./parseCommand.ts";

async function main() {
	const user = new User();
	const scene = new Scene(hall);
	const question = "";
	let running = true;
	let statement = "";

	while (running) {
		const prompts = `${statement}${question}`;
		const answer = await user.ask(prompts);

		const { action, target } = parseCommand(answer);

		statement = "";

		switch (action) {
			case "quit":
				running = quit(user);
				break;

			case "look":
				await scene.look();
				break;

			case "take":
				await scene.take(target);
				break;

			default:
				statement = "I didn't understand that.\n";

				break;
		}
	}
}

function quit(user: User): boolean {
	const confirmQuit = user.ask("Are you sure you want to quit?\n");

	if (confirmQuit[0] === "y") {
		return false;
	}

	return true;
}

main();
