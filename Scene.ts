import { GameData, Item } from "./data/data.ts";
import User from "./User.ts";
import Container from "./Container.ts";

export default class Scene extends Container {
	#user: User;

	constructor(gameData: GameData) {
		super(gameData.items);
		this.#user = new User();
	}

	async look() {
		const description = super.description(this.items);

		await this.#user.tell(`There is ${description}`);
	}

	async take(target: string): Promise<Item | null> {
		const idx = this.items.findIndex(({ name }) => name === target);

		if (idx >= 0) {
			const item = this.items[idx];
			this.items.splice(idx, 1);

			await this.#user.tell("Taken.");

			return item;
		}

		return null;
	}
}
