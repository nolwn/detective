/**
 * Player.ts contains the Player class. It represents the player's state as the game
 * goes on.
 */

import { Effect, Item, VesselProperties } from "./types.ts";
import Vessel from "./Vessel.ts";

// The Player is a type of "Vessel" which is a generic object that can have effects
// and items.
export default class Player extends Vessel<VesselProperties> {
	constructor(items: Item[] = [], _effects: Effect<VesselProperties>[] = []) {
		super({ items }, { effects: [] });
	}

	// inventory is a getter that returns the items in the user's inventory
	get inventory(): Item[] | null {
		return this._properties.items || null;
	}

	// look returns a string that describes the players inventory
	look(): string {
		const description = super.description(this._properties.items || []);

		if (description) {
			return `You have ${description}`;
		} else {
			return "You have nothing.";
		}
	}

	// put takes an item and puts it into the players inventory
	put(item: Item) {
		if (!this._properties.items) this._properties.items = [];
		this._properties.items.push(item);
	}
}
