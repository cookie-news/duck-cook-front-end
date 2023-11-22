import { User } from "../data/user.service";

export type Recipe<ImageType = Array<string>> = {
  id: string;
  idUser: string;
  title: string;
  description: string;
  preparationMethod: string;
  preparationTime: string;
  ingredients: Array<string>;
  images: ImageType;
  countLikes: number;
  countComments: number;
};

export type Comment = {
  user: User;
  message: string;
  id: string;
};

export type LikeRequest = {
  idUser: string;
  idRecipe: string;
};

interface RecipeFactoryType {
  createRecipeByRecipeForm(
    recipeForm: any,
    currentUserId: string
  ): Recipe<FileList>;
}

export const RecipeFactory: RecipeFactoryType = {
  createRecipeByRecipeForm: (
    recipeForm: any,
    currentUserId: string
  ): Recipe<FileList> => {
    const newRecipe: Recipe<FileList> = {} as Recipe<FileList>;

    let preparationTimeInSeconds =
      recipeForm.preparationTimeHours * 60 * 60 +
      recipeForm.preparationTimeMinutes * 60;

    newRecipe.preparationTime = preparationTimeInSeconds.toString();
    newRecipe.idUser = currentUserId;
    newRecipe.ingredients = recipeForm.ingredients.map(
      (ingredient: any) => ingredient.description
    );

    delete recipeForm.preparationTimeHours;
    delete recipeForm.preparationTimeMinutes;
    delete recipeForm.ingredients;

    Object.assign(newRecipe, recipeForm);

    return newRecipe;
  },
};
