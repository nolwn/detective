import * as actions from "./actions.ts";
import { Action } from "./Term.ts";

const inventory: Action = {
	action: actions.checkInventory,
	canPrecedeVariable: false,
	category: "action",
	constant: "inventory",
	precedesCategories: [],
	precedesConstants: [],
};

const look: Action = {
	action: actions.look,
	canPrecedeVariable: false,
	category: "action",
	constant: "look",
	precedesCategories: [],
	precedesConstants: [],
};

const take: Action = {
	action: actions.pickUpItem,
	category: "action",
	canPrecedeVariable: true,
	constant: "take",
	precedesCategories: [],
	precedesConstants: [],
};

export const terms = {
	[inventory.constant]: inventory,
	[look.constant]: look,
	[take.constant]: take,
};
