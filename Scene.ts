import { GameData, Item, SceneProperties } from "./types.ts";
import Vessel from "./Vessel.ts";

export default class Scene extends Vessel<SceneProperties> {
	#isViewed: boolean;

	constructor(gameData: GameData<SceneProperties>) {
		// TODO: [] is a placeholder for scene effects.
		super(gameData.properties, gameData.conditions);
		this.#isViewed = false;
	}

	look(activePlayerEffects: string[], activeSceneEffects: string[]): string {
		const properties = this.applyEffects(
			activePlayerEffects,
			activeSceneEffects
		);
		const itemsDescription = super.description(properties.items || []);
		const { description, shortDescription } = properties;

		let fullDescription = description || "Nothing to see here...";

		if (this.#isViewed && shortDescription) {
			fullDescription = shortDescription;
		} else if (description) {
			this.#isViewed = true;
			fullDescription = description;
		}

		if (itemsDescription) {
			fullDescription += `\n\nThere is ${itemsDescription}`;
		}

		return fullDescription;
	}

	get(target: string): Item | null {
		const { items = [] } = this._properties;
		const idx = items.findIndex(({ name }) => name === target);

		if (idx >= 0) {
			const item = items[idx];
			items.splice(idx, 1);

			return item;
		}

		return null;
	}
}
