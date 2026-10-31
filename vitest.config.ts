import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*_test.?(c|m)[jt]s?(x)"],
  },
});
