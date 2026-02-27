import { ProtostarError } from "@protostar/error";

export type ProtostarDatabaseErrorCode =
  | "NO_ROWS_RETURNED_ERROR"
  | "DRIZZLE_ERROR"
  | "LIBSQL_ERROR";

export class ProtostarDatabaseError extends ProtostarError {
  constructor(message: string, { code }: { code: ProtostarDatabaseErrorCode }) {
    super(message, { code });
  }
}
