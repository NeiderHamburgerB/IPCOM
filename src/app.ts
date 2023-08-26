import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./modules";

class App {
  public app: express.Application = express();

  constructor() {
    dotenv.config()
    //settings
    this.app.set("port", process.env.PORT);

    //middlewares
    this.app.use(express.json());
    this.app.use(cors());

    //routes
    this.app.use("/", routes);

    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );

      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    })
  }
}

const app = new App().app;
export default app;
