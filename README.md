# Installing Biconomy with Sveltekit and Vite

For the most part the Biconomy SDK works well with the Sveltekit starter.

Here are some additional config options I had to make:

## Vite Config with Vercel

Similar to the Biconomy Vite/React setup.

Polyfills are needed as per the standard docs.

```js
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    sveltekit(),
d
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      util: "util",
    },
  },
});
```
