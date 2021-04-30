import { GameData, Item } from "./data/data.ts";
import User from "./User.ts";

export default class Scene {
	#items: Item[];
	#user: User;

	constructor(gameData: GameData) {
		this.#items = gameData.items;
		this.#user = new User();
	}

	async look() {
		const description = this.#items
			.map(({ description }) => description)
			.join(" ");

		await this.#user.tell(description);
	}

	async take(target: string): Promise<Item | null> {
		const idx = this.#items.findIndex(({ name }) => name === target);

		if (idx >= 0) {
			const item = this.#items[idx];
			this.#items.splice(idx, 1);

			await this.#user.tell("Taken.");

			return item;
		}

		return null;
	}
}
