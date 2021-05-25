import Interpreter from "./Interpreter.ts";
import Player from "./Player.ts";
import Scene from "./Scene.ts";
import User from "./User.ts";
import { hall } from "./types.ts";

async function main() {
	const user = new User(); // for communication with the user
	const scene = new Scene(hall); // the room that player is in.
	const player = new Player(); // the players current state
	let running = true; // running flag for the game loop. Stops on false.
	let statement = ""; // holds a statement for the user.

	while (running) {
		const prompts = `${statement}\n`;
		const answer = await user.ask(prompts);

		// User commands that are not player moves, but are about running the
		// game itself (e.g. loading, saving, quitting) may need to get handled
		// here.
		switch (answer) {
			// kills the game loop.
			case "quit":
				running = quit(user);
				statement = "";
				break;

			default:
				// Game moves require more complicated commands, this switch is
				// not adequate to handle them. Here we will pass them off to
				// other functions to parse.
				statement = interpretUserCommand(player, scene, answer);
				break;
		}
	}
}

// Takes player and scene state and a command. Tries to figure out what the
// user is trying to do and, if it can, it executes the command.
function interpretUserCommand(
	player: Player,
	scene: Scene,
	command: string
): string {
	const interpreter = new Interpreter(player, scene, command);
	interpreter.interpret();
	return interpreter.execute();
}

// When it returns false, the loop should be stopped. When it returns true,
// the loop should continue.
function quit(user: User): boolean {
	const confirmQuit = user.ask("Are you sure you want to quit?\n");

	// Anything that starts with a "y" or a "Y" is considered an affirmative
	// response.
	if (confirmQuit[0].toLocaleLowerCase() === "y") {
		return false;
	}

	return true;
}

main();
