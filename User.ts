/**
 * User.ts export the User class that provides methods for communicating with the player
 */

const DEFAULT_PROMPT = ">";

export default class User {
	#prompt: string;

	constructor(prompt: string) {
		this.#prompt = prompt || DEFAULT_PROMPT;
	}

	ask(question: string): string {
		const answer = prompt(`${question}\n${this.#prompt} `);

		if (!answer) {
			return "";
		}

		return answer;
	}

	async tell(statement: string): Promise<void> {
		await this.out(`\n${statement}\n`);
	}

	private async out(text: string): Promise<void> {
		const data = new TextEncoder().encode(text);
		await Deno.stdout.write(data);
	}
}
