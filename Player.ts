import { Item } from "./data/data.ts";
import User from "./User.ts";

export default class Player {
	#items: Item[];
	#user: User;

	constructor(items?: Item[]) {
		this.#items = items || [];
		this.#user = new User();
	}

	drop(item: Item) {
		this.#items.push(item);
	}

	async inventory() {
		const vowels = ["a", "e", "i", "o", "u"];
		const description = this.#items
			.map(({ name }, i) => {
				let anItem = `${vowels.includes(name[0]) ? "an" : "a"} ${name}`;

				if (i + 1 === this.#items.length) {
					anItem = `and ${anItem}`;
				}

				return anItem;
			})
			.join(", ");

		await this.#user.tell(`You have ${description}.`);
	}
}
