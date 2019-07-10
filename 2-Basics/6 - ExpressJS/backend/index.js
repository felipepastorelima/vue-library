const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: true
  })
);

app.get("/todo", (req, res) => {
  res.send([{ id: 1, text: "Create a Vue app" }]);
});

app.post("/todo", bodyParser.json(), (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.delete("/todo/:id", (req, res) => {
  console.log(req.params.id);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
