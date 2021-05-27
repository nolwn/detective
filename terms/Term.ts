/**
 * Term.ts contains the type information for parsing user sentences.
 */

import Player from "../Player.ts";
import Scene from "../Scene.ts";

// ActionFn is the signature for functions that contain the logic associated with verbs
// the player uses.
export type ActionFn = (
	player: Player,
	scene: Scene,
	target?: string, // the target is the target of the action.
	object?: string // the object is an item that is used with the action on the target.
) => string; // should return a description of the result for the player.

// Constant is a specific word that the engine knows about. If the player uses a word
// that is not a Constant, then it should be a variable that represents something that
// is defined in the writer's story files.
export interface Constant {
	constant: string;
	category: Category;
}

// Category is a union of the different kinds of Constants.
export type Category = "action" | "direction" | "position" | "interaction";

// Term describes a known word that the player can use. It tells the parse what kinds of
// words can come after it and what it means.
export interface Term {
	precedesCategories: Category[]; // categories of Constant that can follow this Term
	precedesConstants: Constant[]; // Constants that can follow this Term
	category: Category; // the category of this Terms Constant is part of
	constant: string; // the name of the Constant that this Term describes
	canPrecedeVariable: boolean; // indicates that what follows might be a variable
}

// ActionTerm extends Term, adding the function needed to execute a verb. It also
// guarentees that the category is "action".
export interface ActionTerm extends Term {
	action: ActionFn;
	category: "action";
}
