import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from "vite";
import tailwindcss from '@tailwindcss/vite'

import fs from "node:fs/promises";
import path from "node:path";


function saveMessages(): Plugin {
    const dir = path.resolve(__dirname, "src/server/messages");

    return {
        name: "save-messages",
        configureServer(server) {
            server.middlewares.use("/api/contact", (req, res) => {
                if (req.method !== "POST") {
                    res.statusCode = 405;
                    return res.end();
                }

                let body = "";
                req.on("data", (chunk) => (body += chunk));
                req.on("end", async () => {
                    try {
                        const data = JSON.parse(body);
                        if (!data.name?.trim() || !data.message?.trim()) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ ok: false }));
                        }

                        await fs.mkdir(dir, { recursive: true });
                        const id = Date.now();
                        const entry = { id, receivedAt: new Date().toISOString(), ...data };
                        await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(entry, null, 2));

                        res.setHeader("Content-Type", "application/json");
                        res.statusCode = 200;
                        res.end(JSON.stringify({ ok: true }));
                    } catch (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end(JSON.stringify({ ok: false }));
                    }
                });
            });
        },
    };
}




export default defineConfig({
  base: "/ShaygunArt/",
  plugins: [
    react(),
    tailwindcss(),
    saveMessages(),
     // 2. Add to plugins array
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // This silences the @import warning for Dart Sass
        silenceDeprecations: ['import'],
      },
    },
  },
  server: {
        // Stop Vite from hot-reloading the page every time a message file is written
        watch: { ignored: ["**/src/server/messages/**"] },
    },
});

