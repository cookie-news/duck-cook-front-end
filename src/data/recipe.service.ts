import Api from "./axios.config";
import RecipeType from "@/types/RecipeType";
import IngredientType from '@/types/IngredientType';

const baseUrl = process.env.NEXT_PUBLIC_RECIPE_URL;

interface createRecipe {
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationMethod: string,
  images: FileList,
  title: string;
}

interface updateRecipe {
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationMethod: string,
  title: string;
}

interface recipeComment {
  id: string,
  idUser: string,
  idRecipe: string,
  userName: string,
  message: string
}
interface createRecipeComment {
  idRecipe: string,
  idUser: string,
  message: string
}

interface deleteRecipeComment {
  idRecipe: string,
  idUser: string,
  id: string,
  message: string
}

interface createRecipeLike {
  idRecipe: string,
  idUser: string
}

interface deleteRecipeLike {
  idRecipe: string,
  idUser: string
}

interface getRecipeResponse {
  id:string,
  idUser: string;
  description: string;
  ingredients: IngredientType[];
  preparationTime: number;
  preparationTimeConverted: string;
  preparationMethod: string,
  images: string[],
  title: string;
}

interface getRecipiesPaggingResponse {
  currentPage: number,
  items: string,
  itemsArray: getRecipeResponse[],
  next: number,
  previous: number,
  recordPerPage: number,
  totalPage: number
}

interface getRecipiesMoreLikedsResponse{
  items: getRecipeResponse[],
}

interface getRecipiesByUserResponse{
  items: getRecipeResponse[],
}

interface getRecipeCommentsResponse{
  comments: recipeComment[],
}

function secondsToHourMinute(seconds: number) {

  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);

  var formattedHours = hours < 10 ? '0' + hours : hours;
  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  var result = `${formattedHours}:${formattedMinutes}`;

  return result;
}

export async function createRecipe(body: createRecipe) {
  const endpoint = "/recipe";
  try {

    const formData = new FormData()

    console.log(body);

    formData.append("idUser", body.idUser);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("preparationTime", body.preparationTime.toString());
    formData.append("preparationMethod", body.preparationMethod);

    for(let i = 0; i < body.images.length; i ++){
      const img = body.images.item(i);
      
      if(img){
        formData.append("images", img);
      }
    }
   
    body.ingredients.forEach((ingredient)=>{

      const ingredientData  = {
        measure: ingredient.measure,
        name: ingredient.name,
        quantity: parseFloat(ingredient.quantity)
      }

      formData.append("ingredients", JSON.stringify(ingredientData));

    });
    
    const { data } = await Api.post(baseUrl + endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateRecipe(body: updateRecipe) {
  const endpoint = "/recipe";
  try {

    const formData = new FormData()

    console.log(body);

    formData.append("idUser", body.idUser);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("preparationTime", body.preparationTime.toString());
    formData.append("preparationMethod", body.preparationMethod);

    body.ingredients.forEach((ingredient)=>{

      const ingredientData  = {
        measure: ingredient.measure,
        name: ingredient.name,
        quantity: parseFloat(ingredient.quantity)
      }

      formData.append("ingredients", JSON.stringify(ingredientData));

    });
    
    const { data } = await Api.put(baseUrl + endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(data);
  
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteRecipe(recipeId: string) {

  const endpoint = "/recipe/" + recipeId;
  try {

    const data = await Api.delete(baseUrl  + endpoint);
    
    console.log(data);
    return data;
  
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getRecipe(recipeId: string) {

  const endpoint = "/recipe/" + recipeId;
  try {

    const response = await Api.get<getRecipeResponse>(baseUrl  + endpoint);

    response.data.preparationTimeConverted = secondsToHourMinute(response.data.preparationTime);
    console.log(response);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getRecipiesPagging(pagging: number) {

  const endpoint = "/page/" + pagging;

  try {

    const response = await Api.get<getRecipiesPaggingResponse>(baseUrl  + endpoint);

    response.data.itemsArray = JSON.parse(response.data.items);

    response.data.itemsArray.forEach(item => {
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
    });
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function getRecipiesMoreLikeds( ) {

  const endpoint = "/recipe/" + "more-like";

  try {

    const response = await Api.get<getRecipiesMoreLikedsResponse["items"]>(baseUrl  + endpoint);

    response.data.forEach(item => {
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
    });
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function getRecipiesByUser(userId: string) {

  const endpoint = "/user/" + userId + "/recipe";
  try {

    const response = await Api.get<getRecipiesByUserResponse["items"]>(baseUrl  + endpoint);

    response.data.forEach(item => {
      item.preparationTimeConverted = secondsToHourMinute(item.preparationTime);
    });
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }

}

export async function createRecipeComment(body: createRecipeComment) {

  const endpoint = "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment";
  try {

    const { data } = await Api.post(baseUrl + endpoint, body, {
      headers: {
        "Content-Type": "multipart/json",
      },
    });

    console.log(data);
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function deleteRecipeComment(body: deleteRecipeComment) {

  const endpoint = "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/comment/" + body.id;
  try {

    console.log(body);
    
    const { data } = await Api.delete(baseUrl + endpoint);

    console.log(data);
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function getRecipeComments(recipeId: string) {

  const endpoint = "/recipe/" + recipeId + "/comment";
  try {

    const response = await Api.get<getRecipeCommentsResponse["comments"]>(baseUrl  + endpoint);
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function createRecipeLike(body: createRecipeLike) {

  const endpoint = "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {

    const response = await Api.post(baseUrl  + endpoint);
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function deleteRecipeLike(body: deleteRecipeLike) {

  const endpoint = "/user/" + body.idUser + "/recipe/" + body.idRecipe + "/like";
  try {

    const response = await Api.delete(baseUrl  + endpoint);
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function getRecipeLikes(recipeId: string) {

  const endpoint = "/recipe/" + recipeId + "/like";
  try {

    const response = await Api.get(baseUrl  + endpoint);
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

export async function getRecipeIsLikedByUser(recipeId: string, userId: string) {

  const endpoint = "/user/" + userId + "/recipe/" + recipeId + "/like";
  try {

    const response = await Api.get(baseUrl  + endpoint);
    
    console.log(response.data);
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
  
}

