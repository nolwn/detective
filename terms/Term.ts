import Player from "../Player.ts";
import Scene from "../Scene.ts";

export type ActionFn = (
	player: Player,
	scene: Scene,
	target?: string,
	object?: string
) => string;

export interface Constant {
	constant: string;
	category: Category;
}

export type Category =
	| "action"
	| "direction"
	| "compound"
	| "position"
	| "interaction";

export interface Term {
	precedesCategories: Category[];
	precedesConstants: Constant[];
	category: Category;
	constant: string;
	canPrecedeVariable: boolean;
}

export interface Action extends Term {
	action: ActionFn;
	category: "action";
}
