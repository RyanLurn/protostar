import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { eq } from "drizzle-orm";

import { counterTable } from "@/schema/tables/count";
import { db } from "@/index";

export async function getCount({
  counterName,
}: {
  counterName: string;
}): Promise<Result<number, Error>> {
  try {
    const result = await db
      .select({
        count: counterTable.value,
      })
      .from(counterTable)
      .where(eq(counterTable.name, counterName));

    if (result[0]) {
      return ok(result[0].count);
    }

    return err(new Error("Counter not found"));
  } catch (error) {
    return err(new Error("Failed to get count", { cause: error }));
  }
}
