const express = require("express");
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;
const KQXS_ORIGIN = "https://minhngoc.net.vn/getkqxs/da-nang.js";
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const imageDetection = require("./image-detection");

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

app.post("/image", async (req, res) => {
  try {
    const data = await imageDetection(req.body.data)
    console.log('bbbbbbbbbbb ', data)
    res.send(data)
  } catch (error) {
    res.send(data)
  }
});

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);