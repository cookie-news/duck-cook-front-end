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
      <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
    </PageWrapper>
  );
}
