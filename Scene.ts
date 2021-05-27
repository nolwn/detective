/**
 * Scene.ts contains the Scene class. It represents the state of the current scene.
 */

import { StoryScene, Item, SceneProperties } from "./types.ts";
import Vessel from "./Vessel.ts";

// The Scene is a type of "Vessel" which is a generic object that can have effects
// and items.
export default class Scene extends Vessel<SceneProperties> {
	constructor(gameData: StoryScene<SceneProperties>) {
		// TODO: [] is a placeholder for scene effects.
		super(gameData.properties, gameData.conditions);
	}

	// look returns a string that describes the scene and the items in it
	look(activePlayerEffects: string[], activeSceneEffects: string[]): string {
		// the properties of the scene after effects have been examined an applied
		const properties = this.applyEffects(
			activePlayerEffects,
			activeSceneEffects
		);

		// description of the items in the scene
		const itemsDescription = super.description(properties.items || []);
		const { description } = properties; // description of the room

		// will be a string that includes both the room and item descriptions
		let fullDescription = description || "Nothing to see here...";

		// if there is a description of the items...
		if (itemsDescription) {
			fullDescription += `\n\nThere is ${itemsDescription}`;
		}

		return fullDescription;
	}

	// get removes an items from the scene and returns it
	get(target: string): Item | null {
		const { items = [] } = this._properties;
		const idx = items.findIndex(({ name }) => name === target);

		// if we found an index for the given item
		if (idx >= 0) {
			const item = items[idx];
			items.splice(idx, 1);

			return item;
		}

		// if an item wasn't found and returned, return null
		return null;
	}
}
