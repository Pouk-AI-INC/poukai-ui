/** @type {import("@ladle/react").UserConfig} */
export default {
  stories: "src/**/*.stories.{ts,tsx}",
  defaultStory: "system-reference--all",
  appendToHead: `<link rel="stylesheet" href="/tokens.css" />`,
};
