import { increaseCount, getCount } from "@protostar/db";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { Hono } from "hono";
import { z } from "zod";

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
  .get("/counter/:name/value", async (c) => {
    const name = c.req.param("name");

    const getCountResult = await getCount({ counterName: name });

    if (getCountResult.isErr()) {
      return c.json({ error: getCountResult.error.message }, 404);
    }

    return c.json({ count: getCountResult.value });
  })
  .post(
    "/counter/:name/increase",
    zValidator(
      "json",
      z.object({
        amount: z.int(),
      })
    ),
    async (c) => {
      const name = c.req.param("name");
      const validBody = c.req.valid("json");

      const increaseCountResult = await increaseCount({
        amount: validBody.amount,
        counterName: name,
      });

      if (increaseCountResult.isErr()) {
        const increaseCountError = increaseCountResult.error;
        return c.json({ error: increaseCountError.message }, 404);
      }

      return c.json({ newCount: increaseCountResult.value });
    }
  );

export default app;
