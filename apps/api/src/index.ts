import { getCount } from "@protostar/db";
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
  })
  .get("/count/:name", async (c) => {
    const name = c.req.param("name");

    const getCountResult = await getCount({ counterName: name });

    if (getCountResult.isErr()) {
      return c.json({ error: getCountResult.error.message }, 404);
    }

    return c.json({ count: getCountResult.value });
  });

export default app;
