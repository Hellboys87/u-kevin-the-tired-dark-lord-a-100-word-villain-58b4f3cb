import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Tired Dark Lord: a 100-word villain monologue.
// Lord Malachar of the Black Spire, confronted at last by the hero of
// Aeltharn over the Ember Crown. His weariness is never named: it lives
// in the pauses, the trailing thoughts, and the deflections.
const ENTRY =
  "So. The hero of Aeltharn finally stands before me. " +
  "Yes, the Ember Crown glitters. Yes, the Black Spire bends to my will. " +
  "I have burned villages, raised the dead, bargained with things under the mountain... " +
  "and now, here you are. With your sword. And your speech. " +
  "I remember speeches. I used to... Never mind. " +
  "Take the crown, if you must. I am not stopping you. " +
  "The throne is cold, the paperwork is worse, and honestly\u2014 the garden has gone to seed. " +
  "Sit down, hero. The kingdom can wait... it has waited a thousand years. " +
  "The tea, though\u2014 the tea is getting cold.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = ENTRY.trim();

// Validate the output before writing: UTF-8 text, 1-600 chars, not only whitespace.
const encoded = Buffer.from(text, "utf8");
if (encoded.toString("utf8") !== text) {
  throw new Error("entry text is not valid UTF-8");
}
if (text.length < 1 || text.length > 600) {
  throw new Error(`entry.txt must be 1-600 chars, got ${text.length}`);
}
if (!/\S/.test(text)) {
  throw new Error("entry.txt must not be only whitespace");
}

writeFileSync(join(outDir, "entry.txt"), text, "utf8");
const words = text.split(/\s+/).filter(Boolean).length;
console.log(`wrote entry.txt: ${words} words, ${text.length} chars`);
