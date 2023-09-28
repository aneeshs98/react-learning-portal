import path from "path";
import fs from "fs";
import { promisify } from "util";

const delayTime = 1000; // milliseconds added to all REST calls

const readFile = promisify(fs.readFile);
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  const jsonFile = path.resolve("./", "db.json"); 
  try {
    const readFileData = await readFile(jsonFile);
    await delay(delayTime);
    const maxId = JSON.parse(readFileData).maxId;
    if (!maxId) {
      res
        .status(404)
        .send("Error: Request failed with status code 404");
    } else {
      res.status(200).send(JSON.stringify(maxId, null, 2));
      console.log(`GET /api/todo status: 200`);
    }
  } catch (e) {
    console.log("/api/todo error:", e);
  }
}
