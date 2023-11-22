// Mui
import React from "react";

// Components
import PageWrapper from "@components/PageWrapper";

import { MoreLikedsList } from "./_components/MoreLikedsList";
import { RecipesList } from "./_components/RecipeList";

function PageRoot() {
    return (
        <PageWrapper isProtected={false} hasMenu>
            <div className="flex flex-col gap-8 mt-16 px-4 md:px-0">
                <p className="bg-green-800 p-3 text-white uppercase w-fit font-bold">
                    Receitas mais curtidas
                </p>
                <section className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 gap-2">
                    <MoreLikedsList />
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
