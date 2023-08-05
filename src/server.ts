// simple node web server that displays hello world
// optimized for Docker image

import express, { Request, Response, NextFunction } from "express";
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

import morgan from "morgan";
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const database = require("./configs/database");

// App
const app: express.Application = express();

app.use(morgan("common"));

app.get("/", function(req: Request, res: Response, next: NextFunction): void {
  res.send("!!Caution!! Don't read this. Why do you keep reading? Stop it. Nooooo......    Hello Mom!\n");
});

app.get("/healthz", function(req: Request, res: Response): void {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

export default app;