const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");

app.use(
  cors({
    origin: true
  })
);

(async () => {
  await models.sequelize.sync();

  app.get("/todo", async (req, res) => {
    try {
      const list = await models.todo.findAll();
      res.send(list);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.post("/todo", bodyParser.json(), async (req, res) => {
    try {
      await models.todo.create(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete("/todo/:id", async (req, res) => {
    try {
      const record = await models.todo.findByPk(req.params.id);
      await record.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
