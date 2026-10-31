import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*_stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    config.plugins = (config.plugins ?? [])
      .flat(10)
      .filter(
        (plugin) =>
          !plugin ||
          typeof plugin !== "object" ||
          !("name" in plugin) ||
          typeof plugin.name !== "string" ||
          (!plugin.name.includes("tanstack-start") &&
            !plugin.name.startsWith("tanstack:router-") &&
            !plugin.name.startsWith("tanstack-router:")),
      );
    config.plugins.push(tailwindcss());
    return config;
  },
};
export default config;
