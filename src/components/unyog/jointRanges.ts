/*
 * Joint ranges for the UnYog Body Game.
 *
 * This is a game, not anatomy. The numbers are friendly ballpark values in
 * degrees, measured from the relaxed standing pose. Tweak them freely.
 *
 * Ball-and-socket joints (shoulder, hip)
 *   The limb can point in any direction. Each number is how far (in degrees)
 *   the limb may swing away from hanging straight down, in that direction:
 *     forward   toward the front of the body
 *     outward   out to the side, away from the body
 *     backward  toward the back
 *     inward    across the front of the body
 *   Directions in between blend smoothly. 180 means "all the way up".
 *
 * Hinge joints (elbow, knee)
 *   Bend one way only.
 *     flex         how far it may bend the natural way
 *                  (knee: heel toward buttock, elbow: hand toward shoulder)
 *     hyperextend  small allowance past straight in the wrong direction.
 *                  Anything beyond that says "ouch".
 *
 * Neck
 *     turn        look left or right
 *     nodForward  chin toward chest
 *     nodBack     look up
 *     sideTilt    ear toward shoulder
 */

export const JOINT_RANGES = {
  shoulder: {
    kind: "ball",
    forward: 180,
    outward: 180,
    backward: 60,
    inward: 75,
  },
  hip: {
    kind: "ball",
    forward: 120,
    outward: 45,
    backward: 25,
    inward: 30,
  },
  elbow: {
    kind: "hinge",
    flex: 150,
    hyperextend: 5,
  },
  knee: {
    kind: "hinge",
    flex: 140,
    hyperextend: 5,
  },
  neck: {
    kind: "neck",
    turn: 70,
    nodForward: 50,
    nodBack: 50,
    sideTilt: 40,
  },
} as const;

export type JointId = keyof typeof JOINT_RANGES;
