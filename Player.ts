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

	async look(): Promise<void> {
		const description = super.description(this.items);

		await this.#user.tell(`You have ${description}`);
	}
}
