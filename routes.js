import express from "express";
import { extract } from "./scrape.js";

const app = express.Router();

app.get("/:username", async (req, res) => {
  const username = req.params.username;
  const url = "https://leetcode.com/u/" + username;

  try {
    const response = await extract(url);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to scrape profile", error: error });
  }
});

export default app;