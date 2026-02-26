import { sep } from "path";

export function formatOutput({
  content,
  path,
  ext,
}: {
  content: string;
  path: string;
  ext: string;
}) {
  return `Path: \`.${sep}${path}\`
\`\`\`${ext.slice(1)}
${content.trim()}
\`\`\`
`;
}
