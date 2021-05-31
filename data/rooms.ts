/**
 * rooms.ts represents the game data that drives the story. It should contain all of the
 * elements that are needed to tell the story. Although it is currently written in
 * TypeScript, it should only contain objects which could just as easily be JSON. The
 * reason to make this file TypeScript for now is that it lets the TypeScript compiler
 * tell us if we have made errors. Later, we should add a file parser that can figure out
 * if there are errors in a JSON file and load it if there are not.
 */

import { StoryScene, SceneProperties } from "../types.ts";

const game: { map: StoryScene<SceneProperties>[] } = {
	map: [
		{
			// properties represent the base, default state for this room.
			properties: {
				// This is what the user will see if the look while in the room.
				description: "It's very dark",
				// This array lists all the items that are in the room.
				items: [
					// flashlight is an item that can be used. When it is, it applies an effect
					// to the room that it's being used in.
					{
						name: "flashlight",
						actions: {
							// Use is the name of the ActionTerm that will be used here. If a
							// player types "use flashlight" then this describes what should
							// happen.
							use: {
								// These are the pieces of information that the engine needs to
								// exectue a use action of type "applyEffect."
								args: {
									// This is the name of the effect. It is defined in this file
									// and should correspond to some condition on the player or
									// scene.
									effect: "flashlight-on",

									// can be "player" or "scene"
									applyTo: "player",

									// When it's used, this is what should be reported back to
									// the user.
									result: "The flashlight is on.",

									// If the effect is reversed—unapplied—this is what should be
									// reported back to the user.
									reverseResult: "The flashlight is off.",

									// This indicates that the effect can be unapplied after it
									// is applied. This should be done by calling use again after
									// it has already been called and the effect has been applied.
									reversible: true,
								},
								// applyEffect means that when this item is used, it will apply
								// an effect to either the player or the scene.
								type: "applyEffect",
							},
						},
					},
				],
				// exit to the north leads to the Hall Closet
				exits: [
					{
						description: "a closet to the north",
						direction: "north",
						scene: "Hall Closet",
					},
					{
						description: "a dining room to the south",
						direction: "south",
						scene: "Dining Room",
					},
				],
			},
			// conditions are a set of conditions that, when met, will make alterations to the
			// player or the scene.
			conditions: {
				// effects are conditions that revolve around effects that have been applied to
				// either the player or the scene.
				effects: [
					{
						// This is the name of the effect that, if present, will make alterations
						// to the scene.
						name: "flashlight-on",

						// properties describes the properties on the scene that will be altered
						// by the presents of this effect.
						properties: {
							// description means that, when this effect is applied, i.e. when
							// the flashlight is on, the description will change to the one
							// written here.
							description:
								"You are standing in a big hall. There's lots of nooks, " +
								"crannies, and room for general testing. Aw yeah... sweet testing!",
						},

						// source indicates where the effect should be applied. In this case, the
						// effect should be applied to the player.
						source: "player",
					},
				],
			},
		},
	],
};

export default game;
