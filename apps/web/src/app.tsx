import { rpcClient } from "@protostar/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function App() {
  async function helloHono() {
    const response = await rpcClient.index.$get();

    if (response.ok) {
      toast.success(await response.text());
    } else {
      toast.error("Failed to get response from Hono API");
    }
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-bold">Protostar</h1>
      <p className="text-lg">An autonomous AI agent</p>
      <Button onClick={() => void helloHono()}>Hello Hono</Button>
    </div>
  );
}
