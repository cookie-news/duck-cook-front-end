
import { NextPage } from "next";

import RecipePage from "@components/pages/RecipePage";
import IngredientType from "@root/src/types/IngredientType";

const EditRecipePage: NextPage = () => {
    return (
        <RecipePage cardLabelRecipeData="Editar Receita" cardLabelIngredientData="Editar/Adicionar Ingredientes" recipeProp={{
            title: 'Receita nome',
            description: 'Receita descrição',
            preparetionTimeHours: '1',
            preparetionTimeMinutes: '30',
            ingredients: [{
                name: 'Ingrediente nome',
                quantity: '20',
                measure: 'cup'
            } as IngredientType]
        }} />
    );
};

export default EditRecipePage;
