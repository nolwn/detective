import { Item } from "./data/data.ts";
import Container from "./Container.ts";
import User from "./User.ts";

export default class Player extends Container {
	#user: User;

	constructor(items?: Item[]) {
		super(items || []);
		this.#user = new User();
	}

	put(item: Item) {
		this.items.push(item);
	}

	look(): string {
		const description = super.description(this.items);

		if (description) {
			return `You have ${description}`;
		} else {
			return "You have nothing.";
		}
	}
}
