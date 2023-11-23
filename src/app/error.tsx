"use client";

import Link from "next/link";

import { rootRoutes } from "@root/routes";

import Button from "@components/Button";
import { Information } from "@components/Information";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="w-full h-screen">
      <Information.Root>
        <Information.Image />
        <Information.Content>
          <span className="bg-neutral-default border border-neutral-dark rounded-sm p-2 text-red-800 mt-11">
            {error.message}
          </span>
        </Information.Content>
        <Information.Actions>
          <div className="flex flex-col justify-center">
            <Button className="mt-11" onClick={reset}>
              Tentar novamente
            </Button>
            <Link className="mt-2 underline text-blue-600 text-center" href={rootRoutes.home.path}>
              Voltar para o Feed
            </Link>
          </div>
        </Information.Actions>
      </Information.Root>
    </div>
  );
}
