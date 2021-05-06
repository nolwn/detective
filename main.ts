import User from "./User.ts";
import Scene from "./Scene.ts";
import Player from "./Player.ts";
import { hall } from "./data/data.ts";
import parseCommand from "./parseCommand.ts";

async function main() {
	const user = new User();
	const scene = new Scene(hall);
	const player = new Player();
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
				await pickUpItem(user, scene, player, target);
				break;

			case "inventory":
				await player.look();
				break;

			default:
				statement = "\nI didn't understand that.\n";
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

async function pickUpItem(
	user: User,
	scene: Scene,
	player: Player,
	target?: string
) {
	if (!target) {
		await user.tell("What do you want me to take?");
		return;
	}

	const item = await scene.take(target);

	if (item !== null) {
		player.drop(item);
	}
}

main();
