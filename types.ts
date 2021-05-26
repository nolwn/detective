export * from "./data/rooms.ts";

export type ActionArgs = ApplyEffectArgs;

export type ItemActionType = "applyEffect";

export interface Args {
	result: string;
}

export interface ItemAction {
	type: ItemActionType;
	args: ActionArgs;
}

export interface ApplyEffectArgs extends Args {
	effect: string;
	applyTo: "player" | "scene";
	reversible: boolean;
	reverseResult?: string;
}

export interface ApplyEffectItemAction extends ItemAction {
	type: "applyEffect";
}

export interface Item {
	name: string;
	actions: { [name: string]: ItemAction };
}

export interface Effect<T> {
	name: string;
	properties: T;
	source: "player" | "scene";
}

export interface VesselProperties {
	items?: Item[];
}

export interface SceneProperties extends VesselProperties {
	description?: string;
}

export interface Conditions<T> {
	effects: Effect<T>[];
}

export interface GameData<T> {
	conditions: Conditions<T>;
	properties: SceneProperties;
}
