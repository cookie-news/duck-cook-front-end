
import RecipePage from "@components/pages/RecipePage";

const EditRecipePage: NextPage = () => {
    return (
        <RecipePage cardLabelRecipeData="Editar Receita" cardLabelIngredientData="Editar/Adicionar Ingredientes" recipeProp={{
            title: 'Receita nome',
            description: 'Receita descrição',
            preparetionTimeHours: '1',
            preparetionTimeMinutes: '30',
            ingredients: [{
                name: 'Ingrediente nome',
                quantity: 20,
                measure: 'cup'
            }]
        }} />
    );
};

export default EditRecipePage;
