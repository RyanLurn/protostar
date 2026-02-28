import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-bold">Protostar UI</h1>
      <p className="text-lg">A collection of UI components for Protostar</p>
      <Button onClick={() => toast("Hello World")}>Hello World</Button>
    </div>
  );
}
