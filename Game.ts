import type Player from "./Player.ts";
import type Scene from "./Scene.ts";

export default class Game {
	#player: Player;
	#scene: Scene;

	constructor(player: Player, scene: Scene) {
		this.#player = player;
		this.#scene = scene;
	}

	lookAtScene(): string {
		const { effects } = this.#player;

		return this.#scene.look(effects);
	}
}
