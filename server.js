import express from "express";
import leetcodeRouter from "./routes.js";

const app = express();

app.use("/leetcode", leetcodeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
