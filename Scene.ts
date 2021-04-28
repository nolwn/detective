import { GameData, Item } from "./data/data.ts";

export default class Scene {
	#items: Item[];

	constructor(gameData: GameData) {
		this.#items = gameData.items;
	}

	take(target: string): Item | null {
		const idx = this.#items.findIndex(({ name }) => name === target);

		if (idx >= 0) {
			const item = this.#items[idx];
			this.#items = this.#items.splice(idx, 1);

			return item;
		}

		return null;
	}
}
