import type { Item } from "./data/data.ts";

export default class Container {
	protected items: Item[];

	constructor(items: Item[]) {
		this.items = items;
	}

	description(items: Item[]): string {
		const vowels = ["a", "e", "i", "o", "u"];
		const description = items
			.map(({ name }, i) => {
				let anItem = `${vowels.includes(name[0]) ? "an" : "a"} ${name}`;

				if (i + 1 === items.length) {
					anItem = `and ${anItem}`;
				}

				return anItem;
			})
			.join(", ");

		return description;
	}
}
