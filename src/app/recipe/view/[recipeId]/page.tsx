import React from "react";

import { RecipeService } from "@root/src/data/recipe.service";
import { UserService } from "@root/src/data/user.service";

//Components
import { ShowRichText } from '@components/ShowRichText';

import CarouselImages from "../_components/CarouselImages";
import CommentsSection from "../_components/CommentsSection";
import RateSection from "../_components/RateSection";

const ViewRecipePage = async ({ params }: { params: { recipeId: string } }) => {
    const recipe = await RecipeService.getRecipe(params.recipeId);
    const user = await UserService.getUser("_id", recipe.idUser);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <CarouselImages images={recipe.images} />
                </div>
                <div className="flex-1 flex flex-col gap-5 h-96">
                    <h1 className="uppercase font-bold text-3xl text-slate-700">
                        {recipe.title}
                    </h1>
                    <RateSection
                        idRecipe={params.recipeId}
                        preparationTime={Number(recipe.preparationTime)}
                        commentsNumber={recipe.countComments}
                        likesNumber={recipe.countLikes}
                    />
                    <p className="flex-1 text-slate-700 text-sm font-medium">
                        {recipe.description}
                    </p>
                    <div className="flex gap-2">
                        <p className="text-slate-700 text-sm">
                            <b>Por:</b> {user.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 mt-10 flex-col md:flex-row mb-7">
                <div className="flex flex-1 flex-col gap-4">
                    <h2 className="text-slate-700 font-bold text-2xl ">Igredientes</h2>
                    <div className="bg-neutral-default p-2 rounded-md border border-gray-dark flex flex-col gap-2">
                        {recipe.ingredients.map((item) => (
                            <p key={crypto.randomUUID()} className="capitalize">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                    <h2 className="text-slate-700 font-bold text-2xl ">
                        Modo de preparo
                    </h2>
                    <ShowRichText richText={recipe.preparationMethod} />
                </div>
            </div>
            <CommentsSection idRecipe={params.recipeId} />
        </>
    );
};

export default ViewRecipePage;
