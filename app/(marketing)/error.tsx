"use client";

import { Button } from "@/components/ui/button";
import { LucideBug } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-3 items-center h-56 justify-center">
      <LucideBug className="size-8" />
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-semibold text-lg tracking-tight">
            Something went wrong!
          </h2>
          <p>{error.message}</p>
        </div>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
