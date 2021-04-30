const DEFAULT_PROMPT = ">";

export default class User {
	#prompt: string;
	#out: (text: string) => Promise<void>;

	constructor() {
		this.#prompt = DEFAULT_PROMPT;
		this.#out = async (text: string) => {
			const data = new TextEncoder().encode(text);
			await Deno.stdout.write(data);
		};
	}

	ask(question: string): string {
		const answer = prompt(`${question}\n${this.#prompt} `);

		if (!answer) {
			return "";
		}

		return answer;
	}

	async tell(statement: string): Promise<void> {
		await this.#out(`\n${statement}\n`);
	}
}
