import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.text("Hello from Protostar Server!"));

export default app;
