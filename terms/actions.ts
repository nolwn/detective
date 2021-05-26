import type Scene from "../Scene.ts";
import type Player from "../Player.ts";
import type { ApplyEffectArgs, ItemAction } from "../types.ts";

const ITEM_MISSING = "You don't have that.";
const ITEM_UNUSABLE = "I don't know how to use that.";
const ITEM_ALREADY_USED = "I already did that.";

export function look(player: Player, scene: Scene): string {
	return scene.look(player.activeEffects, scene.activeEffects);
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

export function checkInventory(player: Player): string {
	return player.look();
}

export function use(player: Player, scene: Scene, target?: string): string {
	if (!target) {
		return "What do you want to use?";
	}

	const { inventory } = player;

	if (inventory === null) {
		return ITEM_MISSING;
	}

	const item = inventory.find((i) => i.name === target);

	if (item === undefined) {
		return ITEM_MISSING;
	}

	const itemAction = item?.actions["use"];

	if (itemAction === undefined) {
		return ITEM_UNUSABLE;
	}

	return executeItemAction(player, scene, itemAction);
}

function executeItemAction(
	player: Player,
	scene: Scene,
	{ args, type }: ItemAction
): string {
	switch (type) {
		case "applyEffect":
			return applyEffect(player, scene, args as ApplyEffectArgs);
		default:
			return ITEM_UNUSABLE;
	}
}

function applyEffect(
	player: Player,
	scene: Scene,
	{ applyTo, effect, reverseResult, reversible, result }: ApplyEffectArgs
): string {
	const target = applyTo === "player" ? player : scene;
	const isApplied = target.hasActiveEffect(effect);

	if (!reversible && isApplied) {
		return ITEM_ALREADY_USED;
	}

	if (isApplied) {
		target.removeEffect(effect);
		return reverseResult || result;
	} else {
		target.addEffect(effect);
		return result;
	}
}
