import { Shell } from "lucide-react";

export function Loading() {
  return (
    <div className="flex fixed flex-col gap-3 absolute top-0 left-0 justify-center items-center h-screen w-full z-50 bg-black/70">
      <Shell size={34} className="animate-spin text-white" />
      <p className="text-white">Aguarde...</p>
    </div>
  );
}
