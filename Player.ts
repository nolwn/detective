import { Item } from "./data/data.ts";
import Container from "./Container.ts";
import User from "./User.ts";

export default class Player extends Container {
	#user: User;

	constructor(items?: Item[]) {
		super(items || []);
		this.#user = new User();
	}

	drop(item: Item) {
		this.items.push(item);
	}

	look(): void {
		const description = super.description(this.items);

		this.#user.tell(`You have ${description}`);
	}
}
