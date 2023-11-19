import { ServiceError } from "@utils/Error";

import IngredientType from "@/types/IngredientType";

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

interface getRecipiesPaggingResponse {
  currentPage: number;
  items: string;
  itemsArray: getRecipeResponse[];
  next: number;
  previous: number;
  recordPerPage: number;
  totalPage: number;
}

interface getRecipiesMoreLikedsResponse {
  items: getRecipeResponse[];
}

interface getRecipiesByUserResponse {
  items: getRecipeResponse[];
}

interface getRecipeCommentsResponse {
  comments: recipeComment[];
}

function secondsToHourMinute(seconds: number) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);

  var formattedHours = hours < 10 ? "0" + hours : hours;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  var result = `${formattedHours}:${formattedMinutes}`;

  return result;
}

async function createRecipe(body: createRecipe) {
  const endpoint = "/recipe";
  try {
    const formData = new FormData();

    console.log(body);

    formData.append("idUser", body.idUser);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("preparationTime", body.preparationTime.toString());
    formData.append("preparationMethod", body.preparationMethod);

    for (let i = 0; i < body.images.length; i++) {
      const img = body.images.item(i);

      if (img) {
        formData.append("images", img);
      }
    }

    body.ingredients.forEach((ingredient) => {
      const ingredientData = {
        measure: ingredient.measure,
        name: ingredient.name,
        quantity: parseFloat(ingredient.quantity),
      };

      formData.append("ingredients", JSON.stringify(ingredientData));
    });

    const { data } = await RecipeConfig.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

async function updateRecipe(body: updateRecipe) {
  const endpoint = "/recipe";
  try {
    const formData = new FormData();

    console.log(body);

    formData.append("idUser", body.idUser);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("preparationTime", body.preparationTime.toString());
    formData.append("preparationMethod", body.preparationMethod);

    body.ingredients.forEach((ingredient) => {
      const ingredientData = {
        measure: ingredient.measure,
        name: ingredient.name,
        quantity: parseFloat(ingredient.quantity),
      };

      formData.append("ingredients", JSON.stringify(ingredientData));
    });

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

async function deleteRecipe(recipeId: string) {
  const endpoint = "/recipe/" + recipeId;
  try {
    const data = await RecipeConfig.delete(endpoint);

    console.log(data);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipe(recipeId: string) {
  const endpoint = "/recipe/" + recipeId;
  try {
    const response = await RecipeConfig.get<getRecipeResponse>(endpoint);

    response.data.preparationTimeConverted = secondsToHourMinute(
      response.data.preparationTime
    );

    response.data.preparationTimeConverted = secondsToHourMinute(
      response.data.preparationTime
    );
    console.log(response);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipiesPagging(page: number) {
  const endpoint = "recipe/page/" + page;

  try {
    const response = await RecipeConfig.get<getRecipiesPaggingResponse>(
      endpoint
    );

    response.data.itemsArray = JSON.parse(response.data.items);

    response.data.itemsArray.forEach((item) => {
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
    });

    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getRecipiesMoreLikeds() {
  const endpoint = "/recipe/more-like";

  try {
    const response = await RecipeConfig.get<
      getRecipiesMoreLikedsResponse["items"]
    >(endpoint);

    response.data.forEach((item) => {
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
    });

    return response.data;
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
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
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
  getRecipiesPagging,
  getRecipiesMoreLikeds,
  deleteRecipeLike,
  createRecipeComment,
  deleteRecipeComment,
  getRecipeComments,
  getRecipiesByUser,
  createRecipeLike,
  getRecipeLikes,
};
