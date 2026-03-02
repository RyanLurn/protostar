import { createFileRoute } from "@tanstack/react-router";
import { Button, toast } from "@protostar/ui";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">Protostar Admin Panel</h1>
      <Button onClick={() => toast.success("Yippee!")}>Button</Button>
    </div>
  );
}
