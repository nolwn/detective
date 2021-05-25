export * from "./data/rooms.ts";

export interface Item {
	name: string;
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
	shortDescription?: string;
}

export interface Conditions<T> {
	effects: Effect<T>[];
}

export interface GameData<T> {
	conditions: Conditions<T>;
	properties: SceneProperties;
}
