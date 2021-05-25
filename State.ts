import { GameData, SceneProperties } from "./types.ts";
import Player from "./Player.ts";
import Scene from "./Scene.ts";

export class State {
	#player: Player;
	#scene: Scene;

	constructor(gameData: GameData<SceneProperties>) {
		this.#player = new Player();
		this.#scene = new Scene(gameData);
	}
}
