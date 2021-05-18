import Scene from "../Scene.ts";
import Player from "../Player.ts";

export function look(_player: Player, scene: Scene): string {
	return scene.look();
}

export function pickUpItem(
	player: Player,
	scene: Scene,
	target?: string
): string {
	if (!target) {
		return "What do you want me to get?";
	}

	const item = scene.get(target);

	if (item !== null) {
		player.put(item);
	}

	return "Taken.";
}

export function checkInventory(player: Player) {
	return player.look();
}
