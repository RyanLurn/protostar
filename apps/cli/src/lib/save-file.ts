export async function saveFile({
  destination,
  input,
}: {
  destination: string;
  input: string;
}) {
  try {
    await Bun.write(destination, input);
  } catch (error) {
    console.error("Failed to write output file:", error);
  } finally {
    console.log(`Saved to ${destination}`);
  }
}
