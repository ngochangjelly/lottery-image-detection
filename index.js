const express = require("express");
const fetch = require("node-fetch");
const port = 3000;
const ImageDetection = require("./image-detection");
const KQXS_ORIGIN = "https://minhngoc.net.vn/getkqxs/da-nang.js";
const app = express();

app.post("/image", async (req, res) => {
  // const result = await ImageDetection()
  // res.send(result);
  console.log(req.body)
  res.send('ok')
});
app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);