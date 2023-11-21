export type Ingredient = {
  name: string;
  quantity: number;
  measure: string;
};

export type Recipe = {
  id: string;
  idUser: string;
  title: string;
  description: string;
  preparationMethod: string;
  preparationTime: number;
  ingredients: Ingredient;
  images: Array<string>;
  countLikes: number;
  countComments: number;
};
