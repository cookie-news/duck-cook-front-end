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
  ingredients: Array<Ingredients>;
  preparationTime: number;
  title: string;
}

async function create(body: Array<Recipe>) {
  const endpoint = "/recipe";
  try {
    const { data } = await Api.post(baseUrl + endpoint, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

export const Recipe = {
  create,
};
