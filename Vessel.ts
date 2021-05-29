/**
 * Vessel.ts contains the Vessel class which is a base class that handles effects and
 * containing items. It is the base class for Player and Scene.
 */

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
		this._conditions = conditions; // Conditional properties
		this._properties = properties; // Base properties
		this._activeEffects = activeEffects;
	}

	get activeEffects(): string[] {
		return this._activeEffects;
	}

	addEffect(effect: string): void {
		this.activeEffects.push(effect);
	}

	// Player effects should be applied first, then scene effects should be applied.
	// This will mean that scene effects will take precedence over player effects.
	// Returns base properties with conditional properties applied.
	applyEffects(
		activePlayerEffects: string[],
		activeSceneEffects: string[]
	): T {
		const playerSet = new Set(activePlayerEffects);
		const sceneSet = new Set(activeSceneEffects);

		const effects = this._conditions.effects.filter(({ name, source }) => {
			const set = source === "player" ? playerSet : sceneSet;
			return set.has(name);
		});

		const appliedProperties = { ...this._properties };

		// for each effect, apply changed properties to the
		for (const effect of effects) {
			Object.assign(appliedProperties, effect.properties);
		}

		return appliedProperties;
	}

	// Generate a description of the contained items
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

	// Checks if a given effect exists as an active effect on this vessel
	hasActiveEffect(effect: string): boolean {
		return this._activeEffects.includes(effect);
	}

	// Removes an effect if it is active on this vessel
	removeEffect(effect: string): void {
		const idx = this._activeEffects.findIndex((e) => e === effect);

		if (idx >= 0) {
			this._activeEffects.splice(idx, 1);
		}
	}
}
