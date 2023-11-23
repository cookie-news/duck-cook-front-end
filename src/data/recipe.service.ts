import { Date } from "@utils/Date";
import { ServiceError } from "@utils/Error";

import IngredientType from "@/types/IngredientType";

import { PaginationData } from "../types/PaginationData";
import { Comment, LikeRequest, Recipe } from "../types/Recipe";
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

async function createRecipe(body: Recipe<FileList>, token: string) {
  const endpoint = "/recipe";
  try {
    const formData = getFormDataByRecipe(body);

    const { data } = await RecipeConfig.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

async function updateRecipe(
  body: Recipe<FileList>,
  recipeId: string,
  token: string
) {
  const endpoint = "/recipe";
  try {
    const { data } = await RecipeConfig.put(endpoint, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}

function getFormDataByRecipe(body: Recipe<FileList>) {
  const formData = new FormData();

  for (let keyBody in body) {
    if (keyBody == "images") {
      continue;
    }
    if (keyBody == "ingredients") {
      continue;
    }
    formData.append(keyBody, body[keyBody as keyof Recipe] as string);
  }

  if (body.images) {
    for (let i = 0; i < body.images.length; i++) {
      const img = body.images.item(i);

      if (img) {
        formData.append("images", img);
      }
    }
  }

  body.ingredients?.forEach((ingredient) => {
    formData.append("ingredients", ingredient);
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
    const response = await RecipeConfig.get<Recipe>(endpoint);

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
    console.log(e);
    throw new ServiceError(endpoint);
  }
}

async function getRecipeIsLikedByUser(
  recipeId: string,
  userId: string,
  token: string
) {
  const endpoint = "/user/" + userId + "/recipe/" + recipeId + "/like";
  try {
    const { data } = await RecipeConfig.get(endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (e: any) {
    throw new ServiceError(endpoint);
  }
}

export async function getRecipiesByUser(userId: string, token: string) {
  const endpoint = "/user/" + userId + "/recipe";
  try {
    const response = await RecipeConfig.get<getRecipiesByUserResponse["items"]>(
      endpoint,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    response.data?.forEach((item) => {
      item.preparationTimeConverted = Date.parseSecondsToHours(
        item.preparationTime
      );
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getRecipiesLikedByUser(userId: string, token: string) {
  const endpoint = "/user/" + userId + "/recipe/like";
  try {
    const response = await RecipeConfig.get<getRecipiesByUserResponse["items"]>(
      endpoint,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    response.data?.forEach((item) => {
      item.preparationTimeConverted = Date.parseSecondsToHours(
        item.preparationTime
      );
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function createRecipeComment(body: createRecipeComment, token: string) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment";
  try {
    const { data } = await RecipeConfig.post(endpoint, body, {
      headers: {
        "Content-Type": "multipart/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

async function deleteRecipeComment(body: deleteRecipeComment, token: string) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment/" + body.id;
  try {
    const { data } = await RecipeConfig.delete(endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipeComments(recipeId: string) {
  const endpoint = "/recipe/" + recipeId + "/comment";
  try {
    const response = await RecipeConfig.get<Comment[]>(endpoint);

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function createLike(body: LikeRequest, token: string) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {
    const response = await RecipeConfig.post(endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function deleteRecipeLike(body: LikeRequest, token: string) {
  const endpoint =
    "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {
    const response = await RecipeConfig.delete(endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipeLikes(recipeId: string) {
  const endpoint = "/recipe/" + recipeId + "/like";
  try {
    const response = await RecipeConfig.get(endpoint);

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
  createLike,
  getRecipeLikes,
  getRecipeIsLikedByUser,
  getRecipiesLikedByUser,
};
