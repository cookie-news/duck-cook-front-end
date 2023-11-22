// Mui
import React from "react";

// Components
import PageWrapper from "@components/PageWrapper";

import { MoreLikedsList } from "./_components/MoreLikedsList";
import { RecipesList } from "./_components/RecipeList";
import SearchSection from "./_components/SearchSection";
import SkeletonFallbackMoreLikeds from "./_components/skeletons/SkeletonFallbackMoreLikedsList";

function PageRoot() {
  return (
    <PageWrapper isProtected={false} hasMenu>
      <div className="flex flex-col gap-8">
        <p className="bg-green-800 p-3 text-white uppercase w-fit font-bold">
          RECEITAS MAIS CURTIDAS
        </p>
        <section className="flex gap-[0.4rem] flex-wrap">
          <React.Suspense fallback={<SkeletonFallbackMoreLikeds />}>
            <MoreLikedsList />
          </React.Suspense>
        </section>
        <p className="bg-green-800 p-3 text-white uppercase w-fit font-bold">
          Feed de receitas
        </p>
        <section className="flex flex-col items-end gap-2">
          <RecipesList />
        </section>
      </div>
    </PageWrapper>
  );
}

export default PageRoot;
