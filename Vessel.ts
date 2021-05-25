import type { Conditions, Effect, Item, VesselProperties } from "./types.ts";

export default class Vessel<T extends VesselProperties> {
	protected _conditions: Conditions<T>;
	protected _properties: T;
	protected _activeEffects: string[];

	constructor(
		properties: T,
		conditions: Conditions<T>,
		activeEffects: string[] = []
	) {
		this._conditions = conditions;
		this._properties = properties;
		this._activeEffects = activeEffects;
	}

	get activeEffects(): string[] {
		return this._activeEffects;
	}

	description(items: Item[]): string | null {
		if (items.length === 0) return null;

		const vowels = ["a", "e", "i", "o", "u"];
		const description = items
			.map(({ name }, i) => {
				let anItem = `${vowels.includes(name[0]) ? "an" : "a"} ${name}`;

				// if we have more than one item, and this is the last item...
				if (i > 1 && i + 1 === items.length) {
					anItem = `and ${anItem}`;
				}

				return anItem;
			})
			.join(", ");

		return description;
	}

	// Player effects should be applied first, then scene effects should be applied.
	// This will mean that scene effects will take precedence over player effects.
	applyEffects(
		activePlayerEffects: string[],
		activeSceneEffects: string[]
	): T {
		const activeEffects = [...activePlayerEffects, ...activeSceneEffects];
		const map = this._conditions.effects.reduce(
			(map: { [name: string]: Effect<T> }, effect: Effect<T>) => {
				map[effect.name] = effect;
				return map;
			},
			{}
		);
		const effects = activeEffects.map((e) => map[e]);
		const appliedProperties = { ...this._properties };

		for (const effect of effects) {
			Object.assign(appliedProperties, effect.properties);
		}

		return appliedProperties;
	}
}
