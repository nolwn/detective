import { GameData, SceneProperties } from "../types.ts";

export const hall: GameData<SceneProperties> = {
	properties: {
		description: "It's very dark",
		items: [{ name: "flashlight" }],
	},
	conditions: {
		effects: [
			{
				name: "lights-on",
				properties: {
					description:
						"You are standing in a big hall. There's lots of nooks, " +
						"crannies, and room for general testing. Aw yeah... sweet testing!",
					shortDescription: "You are in a big hall.",
				},
				source: "player",
			},
		],
	},
};
