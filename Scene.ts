import { GameData, Item } from "./data/data.ts";
import User from "./User.ts";
import Container from "./Container.ts";

export default class Scene extends Container {
	#user: User;

	constructor(gameData: GameData) {
		super(gameData.items);
		this.#user = new User();
	}

	look(): string {
		const description = super.description(this.items);

		if (description) {
			return `There is ${description}`;
		} else {
			return "There is nothing around...";
		}
	}

	get(target: string): Item | null {
		const idx = this.items.findIndex(({ name }) => name === target);

		if (idx >= 0) {
			const item = this.items[idx];
			this.items.splice(idx, 1);

			return item;
		}

		return null;
	}
}
