import type Player from "./Player.ts";
import type Scene from "./Scene.ts";
import { terms } from "./terms/terms.ts";
import type {
	Action,
	ActionFn,
	Category,
	Constant,
	Term,
} from "./terms/Term.ts";

const DEFAULT_ISSUE = "I don't understand that.";

export default class Interpreter {
	action: ActionFn | null; // The final command to run
	expectedCategories: Category[]; // command categories that might follow
	expectedConstants: Constant[]; // constants that might follow
	isExpectingVariable: boolean; // a variable might follow
	isValid: boolean; // signals whether the command is understood
	issue: string | null; // a statement for a command that isn't clear
	player: Player; // represents the player state
	scene: Scene; // represents the scene state
	tokens: string[]; // user command split by spaces (tokens)
	vars: string[]; // variables taken from commandf

	constructor(player: Player, scene: Scene, command: string) {
		this.action = null;
		this.expectedCategories = ["action"];
		this.expectedConstants = [];
		this.isExpectingVariable = false;
		this.isValid = true;
		this.issue = null;
		this.player = player;
		this.scene = scene;
		this.tokens = command.split(" ");
		this.vars = [];
	}

	// If the intepreter can figure out what the user meant, execute runs the action
	// function it found with whatever variables it found. If the interpreter could not
	// interpret the user command, then it will respond with whatever the issue was.
	execute(): string {
		let response = DEFAULT_ISSUE;

		if (this.isValid && this.action) {
			response = this.action(this.player, this.scene, ...this.vars);
		} else if (this.issue) {
			response = this.issue;
		}

		return response;
	}

	// interpret tries to figure out what the user wants. If it can, it sets as
	// action function for this object and whatever variables it finds. If it
	// cannot, then it sets the issue.
	interpret() {
		for (const token of this.tokens) {
			if (!this.isValid) break;

			this.interpretToken(token);
		}
	}

	private interpretToken(token: string) {
		const term = Interpreter.lookupTerm(token); // is the token a term?

		if (!term) {
			// if not...
			if (this.isExpectingVariable) {
				// ...are we expecting a variable?
				this.processVariable(token); // add variable
			} else {
				// ...or...
				this.stopParsing(); // this isn't a valid command.
			}
		} else if (
			this.expectedConstants.find(({ constant }) => constant === token)
		) {
			// if this matches an expected constant string...
			this.processTerm(term);
		} else if (this.expectedCategories.includes(term.category)) {
			// ...or category
			this.processTerm(term);
		} else {
			this.stopParsing(); // ...this is not a valid command
		}
	}

	private processTerm(term: Action | Term): void {
		if ("action" in term) {
			this.addAction(term);
		}

		this.expectedCategories = term.precedesCategories;
		this.expectedConstants = term.precedesConstants;
		this.isExpectingVariable = term.canPrecedeVariable;
	}

	private processVariable(token: string) {
		if (this.vars.length >= 2) {
			this.stopParsing();
		} else {
			this.vars.unshift(token.toLocaleLowerCase());
		}
	}

	private addAction(term: Action) {
		// make sure we expected an action and process it if it was
		if (this.expectedCategories.includes("action")) {
			this.action = term.action;
		} else {
			this.stopParsing();
		}
	}

	private stopParsing(issue = DEFAULT_ISSUE) {
		this.issue = issue;
		this.isValid = false;
	}

	private static lookupTerm(token: string): Term | null {
		if (token in terms) {
			return terms[token];
		} else {
			return null;
		}
	}
}
