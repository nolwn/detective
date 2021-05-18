export * from "./rooms.ts";

export interface Item {
	name: string;
}

export interface GameData {
	description: string;
	items: Item[];
}
