import Api from "./axios.config";

const baseUrl = process.env.NEXT_PUBLIC_RECIPE_URL;

interface Ingredients {
  measure: string;
  name: string;
  qty: number;
}

interface Recipe {
  idUser: string;
  description: string;
  ingredients: Ingredients[];
  preparationTime: number;
  preparationMethod: string,
  images: FileList,
  title: string;
}

export async function createRecipe(body: Recipe) {
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

      formData.append("ingredients", JSON.stringify(ingredient));

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
