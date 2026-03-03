import { SERVER_PORT } from "@protostar/common/ports";
import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.text("Hello from Protostar Server!"));

export default {
  port: SERVER_PORT,
  fetch: app.fetch,
};
