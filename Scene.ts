import { GameData, Item } from "./data/data.ts";
import Container from "./Container.ts";

export default class Scene extends Container {
	#roomDescription: string;

	constructor(gameData: GameData) {
		super(gameData.items);

		this.#roomDescription = gameData.description;
	}

	look(): string {
		const itemsDescription = super.description(this.items);
		let description = this.#roomDescription;

		if (itemsDescription) {
			description += `\n\nThere is ${itemsDescription}`;
		}

		return description;
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
