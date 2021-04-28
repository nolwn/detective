export * from "./rooms.ts";

export interface Item {
	name: string;
	description: string;
}

export interface GameData {
	items: Item[];
}
