/**
 * actions.ts contains the logic for various ActionTerms. Exported should match the
 * signature for "ActionFn," which is:
 *
 * (player: Player, scene: Scene, target?: string, object?: string) => string
 *
 * The returned string should be a message for the user that describes the result of the
 * action.
 */

import type Scene from "../Scene.ts";
import type Player from "../Player.ts";
import type { ApplyEffectArgs, ItemAction } from "../types.ts";

const ITEM_MISSING = "I can't find that.";
const ITEM_UNUSABLE = "I don't know how to use that.";
const ITEM_ALREADY_USED = "I already did that.";
const DIRECTION_INACCESSIBLE = "I can't go that way.";

// look is what happens when a player uses the "look" verb. It gets a description of the
// scene.
export function look(player: Player, scene: Scene): string {
	return scene.look(player.activeEffects, scene.activeEffects);
}

// pickUpItem is what happens when a player uses the "take" verb. It finds an item in the
// scene and, if it's there, moves it into the players inventory.
export function pickUpItem(
	player: Player,
	scene: Scene,
	target?: string
): string {
	if (!target) {
		return "What do you want me to get?";
	}

	// remove the item from the scene.
	const item = scene.get(target);

	// The item was found in the scene...
	if (item !== null) {
		player.put(item); // put it in the players inventory.

		return "Taken.";
	}

	return ITEM_MISSING;
}

// checkInventory is what happens when a player uses the "inventory" verb. It gets the
// description for what's in the player's inventory.
export function checkInventory(player: Player): string {
	return player.look();
}

// move changes the scene around the player
export function move(_player: Player, scene: Scene, target?: string) {
	if (!target) {
		return "Where do you want me to go?";
	}

	const { exits } = scene.properties;

	if (!exits) {
		return DIRECTION_INACCESSIBLE;
	}

	const exit = exits.find(
		({ direction }) => direction === target.toLocaleLowerCase()
	);

	if (!exit) {
		return DIRECTION_INACCESSIBLE;
	}

	const { scene: identifier } = exit;
	scene.changeScene(identifier);

	const { description, name } = scene.properties;

	return `${name}\n${description}`;
}

// use is what happens when a player uses the "use" verb. Different items do different
// things when they are used, so the function needs to figure out what kind of usage an
// item is written for, and then execute that logic with whatever arguments the
// storywriter has provided for that item.
export function use(player: Player, scene: Scene, target?: string): string {
	if (!target) {
		return "What do you want to use?";
	}

	const { inventory } = player;

	// if there is no inventory...
	if (inventory === null) {
		return ITEM_MISSING;
	}

	// search the inventory for the named item
	const item = inventory.find((i) => i.name === target);

	if (item === undefined) {
		return ITEM_MISSING;
	}

	const itemAction = item?.actions?.["use"];

	// The item doesn't have action defined for "use", so it cannot be used.
	if (itemAction === undefined) {
		return ITEM_UNUSABLE;
	}

	return executeItemAction(player, scene, itemAction);
}

// executeItemAction figures out what kind of action an item supports and then executes
// the logic for it.
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

// applyEffect contains the logic for applying an effect to the player or the scene.
function applyEffect(
	player: Player,
	scene: Scene,
	{ applyTo, effect, reverseResult, reversible, result }: ApplyEffectArgs
): string {
	const target = applyTo === "player" ? player : scene;

	// if true, effect is already present.
	const isApplied = target.hasActiveEffect(effect);

	if (!reversible && isApplied) {
		// effect is present already and can't be reversed
		return ITEM_ALREADY_USED;
	}

	if (isApplied) {
		// effect is present...
		target.removeEffect(effect);
		return reverseResult || result;
	} else {
		// effect is not present...
		target.addEffect(effect);
		return result;
	}
}
