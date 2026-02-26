import { cors } from "hono/cors";
import { Hono } from "hono";

const app = new Hono()
  .use(
    "/*",
    cors({
      origin: "http://localhost:5173",
    })
  )
  .get("/", (c) => {
    return c.text("Hello from Hono!");
  });

export default app;
