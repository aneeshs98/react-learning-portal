import path from "path";
import fs from "fs";
import { promisify } from "util";

const delayTime = 1000; // milliseconds added to all REST calls

const readFile = promisify(fs.readFile);
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  const jsonFile = path.resolve("./", "db.json");
  const { page = 1, pageSize = 10, platform = 0, searchText = "" } = req.query; 
  try {
    const readFileData = await readFile(jsonFile);
    await delay(delayTime);
    const todos = JSON.parse(readFileData).todos;
    if (!todos) {
      res
        .status(404)
        .send("Error: Request failed with status code 404");
    } else {
      // Filter by platform
      let filteredTodos = todos;
      if (platform != 0) {
        filteredTodos = todos.filter((todo) =>
          todo.platform == platform
        );
      }
      // Filter by searchText (courseName)
      if (searchText) {
        filteredTodos = filteredTodos.filter((todo) =>
          todo.courseName.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const paginatedTodos = filteredTodos.slice(startIndex, endIndex);
      res.status(200).send(JSON.stringify(paginatedTodos, null, 2));
      console.log(`GET /api/todo status: 200`);
    }
  } catch (e) {
    console.log("/api/todo error:", e);
  }
}
