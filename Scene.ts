/**
 * Scene.ts contains the Scene class. It represents the state of the current scene.
 */

import type { Exit, StoryScene, Item, SceneProperties } from "./types.ts";
import Entity from "./Entity.ts";

// The Scene is a type of "Entity" which is a generic object that can have effects
// and items.
export default class Scene extends Entity<SceneProperties> {
	protected _map: StoryScene<SceneProperties>[];
	protected _identifier: string;

	constructor(identifier: string, map: StoryScene<SceneProperties>[]) {
		const scene = Scene.getScene(identifier, map);

		if (!scene) {
			throw new Error("cannot find scene!");
		}

		const { properties, conditions } = scene;

		super(properties, conditions);

		this._identifier = identifier;
		this._map = map;
	}

	changeScene(identifier: string) {
		const scene = Scene.getScene(identifier, this._map);

		if (scene) {
			const { conditions, properties } = scene;

			this.properties = properties;
			this.conditions = conditions;
		}
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

	// look returns a string that describes the scene and the items in it
	look(activePlayerEffects: string[], activeSceneEffects: string[]): string {
		// the properties of the scene after effects have been examined an applied
		const properties = this.applyEffects(
			activePlayerEffects,
			activeSceneEffects
		);

		// description of the items in the scene
		const itemsDescription = super.description(properties.items || []);
		const { description, exits = [] } = properties; // description of the room

		// will be a string that includes both the room and item descriptions
		let fullDescription = description || "Nothing to see here...";

		const exitsDescription = Scene.describeExits(exits);

		fullDescription +=
			exitsDescription && `\n\nThere is ${exitsDescription}.`;

		// if there is a description of the items...
		if (itemsDescription) {
			fullDescription += `\n\nThere is ${itemsDescription}`;
		}

		return fullDescription;
	}

	// Turn exits into a string description with an "and" separating the last two items
	private static describeExits(exits: Exit[]) {
		const exitDescriptions = exits.map(({ description }) => description);
		if (exits.length === 0) {
			return "";
		} else if (exits.length === 1) {
			return exitDescriptions[0];
		} else {
			const lastExit = exitDescriptions[exitDescriptions.length - 1];
			const restExits = exitDescriptions.slice(
				0,
				exitDescriptions.length - 1
			);
			return `${restExits.join(", ")} and ${lastExit}`;
		}
	}

	// This needs to be static so that we can use it in the constructor
	private static getScene(
		identifier: string,
		map: StoryScene<SceneProperties>[]
	): StoryScene<SceneProperties> | null {
		return map.find((scene) => scene.identifier === identifier) || null;
	}
}
