// Mui
import React from "react";

// Components
import PageWrapper from "@components/PageWrapper";

import { RecipesList } from "./_components/RecipeList";

function PageRoot() {
  const config = undefined;
  return (
    <PageWrapper isProtected={false} hasMenu>
      <div className="flex flex-col gap-8 mt-16 px-4 md:px-0">
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
