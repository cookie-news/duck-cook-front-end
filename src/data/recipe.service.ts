import Api from "./axios.config";
import RecipeType from "@/types/RecipeType";
import IngredientType from '@/types/IngredientType';

const baseUrl = process.env.NEXT_PUBLIC_RECIPE_URL;

interface createRecipe {
  idUser: string;
  description: string;
  ingredients: Array<IngredientType>;
  preparationTime: number;
  preparationMethod: string,
  images: FileList,
  title: string;
}

interface getRecipeResponse {
  id:string,
  idUser: string;
  description: string;
  ingredients: Array<IngredientType>;
  preparationTime: number;
  preparationTimeConverted: string;
  preparationMethod: string,
  images: string[],
  title: string;
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

    // formData.append("idUser", body.idUser);
    formData.append("idUser", "1");
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

    console.log(data);
  
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getRecipe(recipeId: string) {

  const endpoint = "/recipe/" + recipeId;
  try {

    const response = await Api.get<getRecipeResponse>(baseUrl  + endpoint);

    response.data.preparationTimeConverted = secondsToHourMinute(response.data.preparationTime);
    
    return response.data;
  
  } catch (e: any) {
    throw new Error(e);
  }
}
