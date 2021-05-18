import type { Item } from "./data/data.ts";

export default class Container {
	protected items: Item[];

	constructor(items: Item[]) {
		this.items = items;
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
}
