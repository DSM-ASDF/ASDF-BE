const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./controller/index");
const { sequelize } = require("./model");

dotenv.config();

const PORT = Number(process.env.PORT ?? 8000);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);

  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`DB has initted`);
    })
    .catch((err) => {
      console.error(err);
    });
});
