import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { consola } from "consola";

import { TEST_COUNTER_NAME } from "@/utils/constants";
import { counterTable } from "@/schema/tables/count";
import { db } from "@/index";

async function seed(): Promise<Result<undefined | string, unknown>> {
  consola.start("Seeding database...");

  try {
    consola.info(`Inserting ${TEST_COUNTER_NAME} counter...`);
    const insertCounterResult = await db
      .insert(counterTable)
      .values({
        name: TEST_COUNTER_NAME,
      })
      .onConflictDoNothing({ target: counterTable.name })
      .returning({ insertedId: counterTable.id });

    if (insertCounterResult[0]) {
      consola.success(`Inserted ${TEST_COUNTER_NAME} counter`);
      return ok(insertCounterResult[0].insertedId);
    }

    consola.warn(`${TEST_COUNTER_NAME} counter already exists`);
    return ok(undefined);
  } catch (error) {
    consola.error("Failed to seed database:", error);
    return err(error);
  }
}

const seedResult = await seed();
if (seedResult.isErr()) {
  process.exit(1);
}

const seedReturnValue = seedResult.value;
if (seedReturnValue) {
  consola.info(`${TEST_COUNTER_NAME} counter ID: ${seedReturnValue}`);
}

process.exit(0);
