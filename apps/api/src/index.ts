import { cors } from "hono/cors";
import { Hono } from "hono";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
  })
);
app.get("/", (c) => {
  return c.text("Hello from Hono!");
});

export default app;
