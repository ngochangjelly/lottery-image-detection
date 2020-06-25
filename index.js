const express = require("express");
const { LOCAL_PORT } = require('./constants')
const { clear } = require('./utils')

const ImageDetection = require("./image-detection");
const app = express();

app.get("/", async (req, res) => {
  clear()
  const result = await ImageDetection()
  console.log("result", result)
  res.send(result);
});
app.listen(LOCAL_PORT, () =>
  console.log(`Example app listening at http://localhost:${LOCAL_PORT}`)
);