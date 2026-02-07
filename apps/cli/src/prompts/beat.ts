export function beat() {
  const now = new Date();
  const date = now.toLocaleDateString(undefined, { dateStyle: "full" });
  const time = now.toLocaleTimeString(undefined, { timeStyle: "full" });

  const heartbeat = `
  [Heartbeat]
  
  Date: ${date}
  Time: ${time}
  `;

  return heartbeat;
}
