import type { Result } from "neverthrow";

import { sql, eq } from "drizzle-orm";
import { err, ok } from "neverthrow";

import { counterTable } from "@/schema/tables/count";
import { db } from "@/index";

export async function increaseCount({
  counterName,
  amount,
}: {
  counterName: string;
  amount: number;
}): Promise<Result<number, Error>> {
  try {
    const result = await db
      .update(counterTable)
      .set({ value: sql`${counterTable.value} + ${amount}` })
      .where(eq(counterTable.name, counterName))
      .returning({ newCount: counterTable.value });

    if (result[0]) {
      return ok(result[0].newCount);
    }

    return err(new Error("Counter not found"));
  } catch (error) {
    return err(new Error("Failed to update count", { cause: error }));
  }
}
