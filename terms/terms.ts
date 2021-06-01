/**
 * terms.ts contains the Terms that describe the Constants that the player can use.
 * See Terms.ts for more information about what these terms can be.
 */

import * as actions from "./actions.ts";
import { ActionTerm } from "./Term.ts";

const inventory: ActionTerm = {
	action: actions.checkInventory,
	canPrecedeVariable: false,
	category: "action",
	constant: "inventory",
	precedesCategories: [],
	precedesConstants: [],
};

const look: ActionTerm = {
	action: actions.look,
	canPrecedeVariable: false,
	category: "action",
	constant: "look",
	precedesCategories: [],
	precedesConstants: [],
};

const move: ActionTerm = {
	action: actions.move,
	canPrecedeVariable: true,
	category: "action",
	constant: "go",
	precedesCategories: [],
	precedesConstants: [],
};

const take: ActionTerm = {
	action: actions.pickUpItem,
	canPrecedeVariable: true,
	category: "action",
	constant: "take",
	precedesCategories: [],
	precedesConstants: [],
};

const use: ActionTerm = {
	action: actions.use,
	canPrecedeVariable: true,
	category: "action",
	constant: "use",
	precedesCategories: [],
	precedesConstants: [],
};

export const terms = {
	[inventory.constant]: inventory,
	[look.constant]: look,
	[move.constant]: move,
	[take.constant]: take,
	[use.constant]: use,
};
