import { Date } from "@utils/Date";
import { ServiceError } from "@utils/Error";

import IngredientType from "@/types/IngredientType";

import { PaginationData } from "../types/PaginationData";
import { Recipe } from "../types/Recipe";
import RecipeConfig from "./config/RecipeConfig";

interface createRecipe {
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationMethod: string;
  images: FileList;
  title: string;
}

interface updateRecipe {
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationMethod: string;
  title: string;
}

interface recipeComment {
  id: string;
  idUser: string;
  idRecipe: string;
  userName: string;
  message: string;
}
interface createRecipeComment {
  idRecipe: string;
  idUser: string;
  message: string;
}

interface deleteRecipeComment {
  idRecipe: string;
  idUser: string;
  id: string;
  message: string;
}

interface createRecipeLike {
  idRecipe: string;
  idUser: string;
}

interface deleteRecipeLike {
  idRecipe: string;
  idUser: string;
}

interface getRecipeResponse {
  id: string;
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationTimeConverted: string;
  preparationMethod: string;
  images: string[];
  title: string;
}

interface getRecipiesByUserResponse {
  items: getRecipeResponse[];
}

interface getRecipeCommentsResponse {
  comments: recipeComment[];
}

async function createRecipe(body: Recipe<FileList>) {
  const endpoint = "/recipe";
  try {
    const formData = getFormDataByRecipe(body);

    const { data } = await RecipeConfig.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

async function updateRecipe(body: Recipe<FileList>) {
  const endpoint = "/recipe";
  try {
    const formData = getFormDataByRecipe(body);

    const { data } = await RecipeConfig.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

function getFormDataByRecipe(body: Recipe<FileList>)
{
    const formData = new FormData();

    for(let keyBody in body) 
    { 
      if(keyBody == 'images') { continue; }
      formData.append(keyBody, body[keyBody as keyof Recipe] as string); 
    }

    for (let i = 0; i < body.images.length; i++) {
        const img = body.images.item(i);

        if (img) {
          formData.append("images", img);
        }
    }

    body.ingredients.forEach((ingredient) => {
        formData.append("ingredients", JSON.stringify(ingredient));
    });

    return formData;
}

async function deleteRecipe(recipeId: string) {
  const endpoint = "/recipe/" + recipeId;
  try {
    const data = await RecipeConfig.delete(endpoint);

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipe(recipeId: string) {
  const endpoint = "/recipe/" + recipeId;
  try {
    const response = await RecipeConfig.get<Recipe[]>(endpoint);

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipes(page: number) {
  const endpoint = "recipe/page/" + page;

  try {
    const { data } = await RecipeConfig.get<PaginationData<Recipe>>(endpoint);
    return data;
  } catch (e: any) {
    console.error(e);
    throw new ServiceError(endpoint);
  }
}

async function getRecipiesMoreLikeds() {
  const endpoint = "/recipe/more-like";

  try {
    const { data } = await RecipeConfig.get<Recipe[]>(endpoint);

    return data;
  } catch (e: any) {
    throw new ServiceError(endpoint);
  }
}

export async function getRecipiesByUser(userId: string) {
  const endpoint = "/user/" + userId + "/recipe";
  try {
    const response = await RecipeConfig.get<getRecipiesByUserResponse["items"]>(
      endpoint
    );

    response.data.forEach((item) => {
      item.preparationTimeConverted = Date.parseSecondsToHours(
        item.preparationTime
      );
    });

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function createRecipeComment(body: createRecipeComment) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment";
  try {
    const { data } = await RecipeConfig.post(endpoint, body, {
      headers: {
        "Content-Type": "multipart/json",
      },
    });

    console.log(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

async function deleteRecipeComment(body: deleteRecipeComment) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment/" + body.id;
  try {
    console.log(body);

    const { data } = await RecipeConfig.delete(endpoint);

    console.log(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipeComments(recipeId: string) {
  const endpoint = "/recipe/" + recipeId + "/comment";
  try {
    const response = await RecipeConfig.get<
      getRecipeCommentsResponse["comments"]
    >(endpoint);

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function createRecipeLike(body: createRecipeLike) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {
    const response = await RecipeConfig.post(endpoint);

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function deleteRecipeLike(body: deleteRecipeLike) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {
    const response = await RecipeConfig.delete(endpoint);

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipeLikes(recipeId: string) {
  const endpoint = "/recipe/" + recipeId + "/like";
  try {
    const response = await RecipeConfig.get(endpoint);

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const RecipeService = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  getRecipiesMoreLikeds,
  deleteRecipeLike,
  createRecipeComment,
  deleteRecipeComment,
  getRecipeComments,
  getRecipiesByUser,
  createRecipeLike,
  getRecipeLikes,
};
