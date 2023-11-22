"use client";

import Button from "@components/Button";
import { Information } from "@components/Information";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Information.Root>
      <Information.Image />
      <Information.Content>
        <span className="bg-neutral-default border border-neutral-dark rounded-sm p-2 text-red-800 mt-11">
          {error.message}
        </span>
      </Information.Content>
      <Information.Actions>
        <Button className="mt-11" onClick={reset}>
          Tentar novamente
        </Button>
      </Information.Actions>
    </Information.Root>
  );
}
