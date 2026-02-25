import { parse, join } from "path";
import { stat } from "fs/promises";
import { consola } from "consola";
import { parseArgs } from "util";
import { z } from "zod";

try {
  const { values } = parseArgs({
    options: {
      "exclude-gitignore": {
        type: "boolean",
        default: false,
      },
      path: {
        type: "string",
      },
    },
    allowPositionals: true,
    args: Bun.argv,
    strict: true,
  });

  const InputSchema = z.object({
    "exclude-gitignore": z.boolean().default(false),
    path: z.string(),
  });

  const parsedInput = InputSchema.parse(values);

  const stats = await stat(parsedInput.path);

  const outputDir = join(import.meta.dir, "..", "grabbed");

  if (stats.isFile()) {
    const fileContent = await Bun.file(parsedInput.path).text();
    const fileName = parse(parsedInput.path).name;
    const fileExtension = parse(parsedInput.path).ext;

    const fileOutputContent = `Path: \`${parsedInput.path}\`
\`\`\`${fileExtension.slice(1)}
${fileContent.trim()}
\`\`\`
`;

    const fileOutputPath = join(outputDir, `${fileName}.md`);
    await Bun.write(fileOutputPath, fileOutputContent);

    consola.success(`File grabbed and saved to ${fileOutputPath}`);
  }
} catch (error) {
  consola.error(error);
}
