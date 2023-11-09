import { NextPage } from "next";

import RecipePage from "@components/pages/RecipePage";

const CreateEditPage: NextPage = () => {
  return (
    <RecipePage
      cardLabelRecipeData="Criar Receita"
      cardLabelIngredientData="Adicionar Ingredientes"
      recipeProp={undefined}
    />
  );
};

export default CreateEditPage;
