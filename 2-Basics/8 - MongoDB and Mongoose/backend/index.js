const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/todo");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true
  });

  app.use(
    cors({
      origin: true
    })
  );

  app.get("/todo", async (req, res) => {
    try {
      const list = await Todo.find();
      res.send(list);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.post("/todo", bodyParser.json(), async (req, res) => {
    try {
      await Todo.create(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete("/todo/:id", async (req, res) => {
    try {
      await Todo.deleteOne({ _id: req.params.id });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
