/**
 * types.ts describes basic types used by the engine.
 */

export * from "./data/rooms.ts";

// ActionArgs is a union of all the different argument types that can be used with an
// action
export type ActionArgs = ApplyEffectArgs;

// ItemActionType is a union of all the types of action that can be used
export type ItemActionType = "applyEffect";

// Args is a base interface for the various argument interfaces
export interface Args {
	result: string;
}

// ItemAction represents an action that can be taken by an item
export interface ItemAction {
	type: ItemActionType;
	args: ActionArgs;
}

// ApplyEffectArgs are the arguments required to apply effects to a player or scene
export interface ApplyEffectArgs extends Args {
	effect: string;
	applyTo: "player" | "scene";
	reversible: boolean;
	reverseResult?: string;
}

// ApplyEffectItemAction describes the apply effect action
export interface ApplyEffectItemAction extends ItemAction {
	type: "applyEffect";
	args: ApplyEffectArgs;
}

// Item represents some item either in the scene or in the player's inventory
export interface Item {
	name: string;
	actions: { [name: string]: ItemAction };
}

// Effect represents some effect that may be applied to a scene or player
export interface Effect<T extends VesselProperties> {
	name: string;
	properties: T;
	source: "player" | "scene"; // where the effect is applied
}

// VesselProperties is a base interface for the properties that a user or scene might have
export interface VesselProperties {
	items?: Item[];
}

// SceneProperties are the properties (in addition to the VesselProperties) that are
// needed by the scene
export interface SceneProperties extends VesselProperties {
	description?: string;
}

// Conditions contains story elements that can be conditionally applied to the scene or
// player
export interface Conditions<T extends VesselProperties> {
	effects: Effect<T>[];
}

// StoryScene holds both the conditions and properties for a scene.
export interface StoryScene<T extends VesselProperties> {
	conditions: Conditions<T>;
	properties: SceneProperties;
}
