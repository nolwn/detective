import { Effect, Item, VesselProperties } from "./types.ts";
import Vessel from "./Vessel.ts";

export default class Player extends Vessel<VesselProperties> {
	#effects: Effect<VesselProperties>[];

	constructor(items: Item[] = [], effects: Effect<VesselProperties>[] = []) {
		super({ items }, { effects: [] });

		this.#effects = effects;
	}

	look(): string {
		const description = super.description(this._properties.items || []);

		if (description) {
			return `You have ${description}`;
		} else {
			return "You have nothing.";
		}
	}

	put(item: Item) {
		if (!this._properties.items) this._properties.items = [];
		this._properties.items.push(item);
	}

	get inventory(): Item[] | null {
		return this._properties.items || null;
	}
}
