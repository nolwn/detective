const DEFAULT_PROMPT = ">";

export default class Console {
	#prompt: string;

	constructor() {
		this.#prompt = DEFAULT_PROMPT;
	}

	ask(question: string): string {
		const answer = prompt(`${question}\n${this.#prompt} `);

		if (!answer) {
			return "";
		}

		return answer;
	}
}
