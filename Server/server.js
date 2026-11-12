import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json({limit: "10kb"}))

const dataDir = path.join(__dirname, "data");
const messagesDir = path.join(__dirname, "messages");

app.get("/", (req, res) => {
    res.json({ status: "ok", dataDir });
});

app.get("/data/:name", async (req, res) => {
    const { name } = req.params;
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
        return res.status(400).json({ error: "Invalid file name" });
    }

    const filePath = path.join(dataDir, `${name}.json`);
    console.log("Reading:", filePath);

    try {
        const data = await fs.readFile(filePath, "utf8");
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error.message);
        if (error.code === "ENOENT") {
            return res.status(404).json({ error: `Not found: ${filePath}` });
        }
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/contact", async(req,res) =>{
    const {name, email, phone, subject, message} = req.body ?? {};

    if(typeof name !== "string" || !name.trim() || typeof message !== "string" || !message.trim()){
        return res.status(400).json({error: "input too long."});
    }

    const entry = {
        name: name.trim(),
        email: String(email ?? "").trim(),
        phone: String(phone ?? "").trim(),
        subject: String(subject ?? "").trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString(),

    }
    try{
        await fs.mkdir(messagesDir, {recursive: true});
        const file = path.join(messagesDir, `${Date.now()}.json`);
        await fs.writeFile(file, JSON.stringify(entry, null, 2), "utf8");
        res.status(200).json({ok:true});
    }catch(error){
        console.error(error.message);
        res.status(500).json({error: "Could not save message."});
    }
});

app.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});