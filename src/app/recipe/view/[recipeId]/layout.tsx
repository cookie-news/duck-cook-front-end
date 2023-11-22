import React from "react";

import PageWrapper from "@components/PageWrapper";

import Loading from "./loading";

export default function LayoutRecipeView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper hasMenu isProtected={false}>
      <div className="mt-20 px-4 md:px-0">
        <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
      </div>
    </PageWrapper>
  );
}
