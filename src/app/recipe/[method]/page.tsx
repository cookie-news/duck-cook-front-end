'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

//Material UI
import {
    TextField,
    Button,
    FormLabel
} from "@mui/material";

//Custom Components
import Loading from '@components/Loading';
import ToastCMP from '@components/Toast';
import InputDropzone from '@components/form/InputDropzone';
import Card from '@components/Card';
import AddIngredient from '@components/form/AddIngredient';

//Form
import { RecipeForm } from "@forms/recipe/create";
import { useForm } from "react-hook-form";

//Types
import { ToastType } from "@/types/ToastType";
import RecipeType from "@/types/RecipeType";
import { NextPage } from "next";

//Data services
import { createRecipe } from "@root/src/data/recipe.service";

const RecipePage = ({ params, searchParams}: { params: { method: string }, searchParams: { id: string} }) => {
    // routers
    const router = useRouter();

    const cardLabelRecipeData = params?.method == 'create' ? 'Criar Receita' : 'Editar Receita';
    const cardLabelIngredientData = params?.method == 'create' ? 'Adicionar Ingredientes' : 'Editar/Adicionar Ingredientes';

    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [load, setLoad] = useState(false);

    const [toast, setToast] = useState<ToastType>({
        open: false,
        type: "info",
        message: "",
    });

    const [stateRecipe, setStateRecipe] = useState('setRecipe');
    let [recipe, setRecipe] = useState<RecipeType>({
        ingredients: []
    });

    const onNextStateRecipe = (values: any) => {
        setStateRecipe('addIngredients');
        values.ingredients = recipe.ingredients;
        
        setRecipe(values);
    };

    const onBackStateRecipe = () => {
        setStateRecipe('setRecipe');
    };

    const onChangeIngredients = (newIngredients:any) =>
    {
        let newRecipe = {...recipe};
        newRecipe.ingredients = newIngredients;
        setRecipe(newRecipe);
    }

    const handlerSaveRecipe = async () => {

        try {
            createRecipe({ idUser: "",
                           description: recipe.description,
                           images: recipe.images,
                           ingredients: [],
                           preparationMethod: recipe.methodPreparation,
                           preparationTime: ( (parseInt(recipe.preparetionTimeHours ?? '') * 60) * 60 + parseInt(recipe.preparetionTimeMinutes ?? '') * 60 ),
                           title: recipe.title } as any);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card title={ stateRecipe === 'setRecipe' ? cardLabelRecipeData || '' : cardLabelIngredientData || ''  }>
                {
                    stateRecipe === 'setRecipe' 
                    ? 
                        <form>
                            <div className="flex flex-row flex-wrap md:grid md:grid-cols-2 gap-2">
                                <div className="w-full">
                                    <FormLabel>Informações da receita:</FormLabel>
                                    {RecipeForm.map((form) => (
                                        form.type === 'time' 
                                        ?
                                            <div className={form.className} key={crypto.randomUUID()}>
                                                <FormLabel>{form.label}</FormLabel>
                                                <div className="mt-2 md:grid md:grid-cols-2 gap-2">
                                                    <TextField
                                                        type="number"
                                                        label="Horas"
                                                        error={errors && !!errors[form.name+'Hours' as string]}
                                                        helperText={errors && errors[form.name+'Hours' as string]?.message as string}
                                                        fullWidth
                                                        defaultValue={recipe[form.name+'Hours' as keyof RecipeType]}
                                                        {...register(form.name+'Hours' as string, form.validates)}
                                                        onChange={() => {}}
                                                    />
                                                    <TextField
                                                        type="number"
                                                        label="Minutos"
                                                        error={errors && !!errors[form.name+'Minutes' as string]}
                                                        helperText={errors && errors[form.name+'Minutes' as string]?.message as string}
                                                        fullWidth
                                                        className="mt-4 md:mt-0"
                                                        defaultValue={recipe[form.name+'Minutes' as keyof RecipeType]}
                                                        {...register(form.name+'Minutes' as string, form.validates)}
                                                        onChange={() => {}}
                                                    />
                                                </div>
                                            </div>
                                        :
                                            <TextField
                                                key={crypto.randomUUID()}
                                                label={form.label}
                                                placeholder={form.placeholder}
                                                className={form.className}
                                                type={form.type}
                                                error={errors && !!errors[form.name as string]}
                                                helperText={errors && errors[form.name as string]?.message as string}
                                                fullWidth
                                                multiline={form.multiline}
                                                rows={form.rows}
                                                defaultValue={recipe[form.name as keyof RecipeType]}
                                                {...register(form.name as string, form.validates)}
                                                onChange={() => {}}
                                            />
                                    )
                                    )}
                                </div>
                                <div className="w-full">
                                    <input multiple type="file" {...register("images")} ></input> 
                                    {/* <InputDropzone name="images" registerInput={register} label="Adicione as imagens da receita:" acceptedFiles={['image/png']} /> */}
                                </div>
                            </div>
                        </form>
                    :
                        <AddIngredient ingredients={recipe?.ingredients} onChange={onChangeIngredients} />
                }
                <>
                    <div className="w-full">
                        <Button
                            variant="contained"
                            size="large"
                            className="w-full"
                            onClick={stateRecipe === 'setRecipe' ? handleSubmit(onNextStateRecipe) : handleSubmit(handlerSaveRecipe)}
                        >
                            { stateRecipe === 'setRecipe' ? 'AVANÇAR' : 'SALVAR' }
                        </Button>
                    </div>
                    <div className="w-full">
                        <Button
                            variant="outlined"
                            size="large"
                            className="w-full"
                            onClick={onBackStateRecipe}
                        >
                            { stateRecipe === 'addIngredients' ? 'VOLTAR' : 'CANCELAR' }
                        </Button>
                    </div>
                </>
            </Card>

            <Loading load={load} />
            <ToastCMP toast={toast} />
        </>
    );
};

export default RecipePage;
