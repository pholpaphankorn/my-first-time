import app from "./server";
import port  from "./configs/database";

const server = app.listen(process.env.EXPRESS_PORT, () => {
  console.log("Webserver is ready on port %d", process.env.EXPRESS_PORT);
});

process.on("SIGINT", () => {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

process.on("SIGTERM", () => {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
};