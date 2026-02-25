import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-bold">Protostar</h1>
      <p className="text-lg">An autonomous AI agent</p>
      <Button>Click me</Button>
    </div>
  );
}
