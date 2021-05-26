import { GameData, SceneProperties } from "../types.ts";

export const hall: GameData<SceneProperties> = {
	properties: {
		description: "It's very dark",
		items: [
			{
				name: "flashlight",
				actions: {
					use: {
						args: {
							effect: "lit-by-flashlight",
							applyTo: "scene",
							result: "The flashlight is on.",
							reverseResult: "The flashlight is off.",
							reversible: true,
						},
						type: "applyEffect",
					},
				},
			},
		],
	},
	conditions: {
		effects: [
			{
				name: "lit-by-flashlight",
				properties: {
					description:
						"You are standing in a big hall. There's lots of nooks, " +
						"crannies, and room for general testing. Aw yeah... sweet testing!",
				},
				source: "player",
			},
		],
	},
};
