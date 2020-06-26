const express = require("express");
const fetch = require("node-fetch");
const port = 3001;
const ImageDetection = require("./image-detection");
const KQXS_ORIGIN = "https://minhngoc.net.vn/getkqxs/da-nang.js";
const app = express();

app.get("/", async (req, res) => {
  const result = await ImageDetection()
  res.send(result);
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);