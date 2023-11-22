"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

//Material UI
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import Button from "@components/Button";
import { Input } from "@components/Input";

//Form
import { IngredientForm } from "@forms/recipe/ingredient";

import "./index.css";
//Types
import { zodResolver } from "@hookform/resolvers/zod";
import { Check as CheckIcon, Pencil, Plus, Trash2, X as CloseIcon } from "lucide-react";
import { z } from "zod";

import {
    StyledTableThreadCell,
    StyledTableThreadRow,
} from "./styles";

const addIngredientFormSchema = z.object({
    description: z.string().nonempty("O campo é obrigatório.")
});

type AddIngredientFormData = z.infer<typeof addIngredientFormSchema>;

const AddIngredient = ({
    onChange = (newIngredients: Array<any>) => { },
    ...props
}) => {
    /**
     * @TODO Retirar o useRef de dentro do map
     */

    // eslint-disable-next-line react-hooks/rules-of-hooks
    IngredientForm.map((form) => (form.ref = useRef()));

    console.log(props);

    const getDefaultIngredient = () => {
        return {
            description: ""
        } as any;
    };

    const [ingredients, setIngredients] = useState<any[]>(
        props.ingredients
    );
    let [ingredientEdit, setIngredientEdit] = useState<any>(
        getDefaultIngredient()
    );

    // react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus
    } = useForm<AddIngredientFormData>({
        resolver: zodResolver(addIngredientFormSchema),
    });

    const updateIngredients = (newIngredients: Array<any>) => {
        setIngredients(newIngredients);
        onChange(newIngredients);
    };

    const resetIngredientItem = (ingredient: any) => {
        reset(ingredient);
        setIngredientEdit(ingredient);
    };

    const resetEditingIngredient = () => {
        let newIngredients = [...ingredients];

        newIngredients.map((ingredient: any) => {
            if (ingredient.isEdit) {
                ingredient.isEdit = false;
            }
        });

        updateIngredients(newIngredients);
        resetIngredientItem(getDefaultIngredient());
    };

    const addIngredientItem = (ingredient: any) => {
        ingredient.id = crypto.randomUUID();
        const newIngredients = ingredients ? [...ingredients, ingredient] : [ingredient];

        updateIngredients(newIngredients);
        resetIngredientItem(getDefaultIngredient());
    };

    const deleteIngredientItem = (ingredientIndex: number) => {
        let newIngredients = [...ingredients];
        newIngredients.splice(ingredientIndex, 1);

        updateIngredients(newIngredients);
    };

    const editIngredientItem = (ingredientIndex: number) => {
        setFocus('description');
        resetEditingIngredient();

        let newIngredients = [...ingredients];
        newIngredients[ingredientIndex].isEdit = true;
        updateIngredients(newIngredients);

        resetIngredientItem(ingredients[ingredientIndex]);
    };

    const saveEditIngredientItem = (ingredient: any) => {
        resetEditingIngredient();

        let newIngredients = [...ingredients];
        let ingredientEditedIndex = newIngredients.findIndex(
            (x) => x.id == ingredientEdit.id
        );
        ingredient.isEdit = false;
        ingredient.id = ingredientEdit.id;
        newIngredients[ingredientEditedIndex] = ingredient;

        updateIngredients(newIngredients);
    };

    return (
        <div className="p-2">
            <div
                key={crypto.randomUUID()}
                className="mt-4 mb-4"
            >
                {ingredientEdit &&
                    <>
                        <Input.Root>
                            <Input.Textfield
                                name="description"
                                register={register}
                                type="text"
                                placeholder="Descreva o ingrediente aqui, ex: 3 ovos"
                            />
                        </Input.Root>
                        {errors.description && <Input.Error>{errors.description.message}</Input.Error>}
                    </>
                }
            </div>
            <div className="mt-4 mb-8 w-full flex justify-center gap-2">
                {!ingredientEdit.isEdit ? (
                    <Button
                        onClick={handleSubmit(addIngredientItem)}
                        variant="secondary"
                    >
                        <Plus /> Adicionar Ingrediente
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={handleSubmit(saveEditIngredientItem)}
                        >
                            <CheckIcon /> Salvar
                        </Button>
                        <Button
                            variant="secondary"
                            color="error"
                            onClick={handleSubmit(resetEditingIngredient)}
                        >
                            <CloseIcon /> Cancelar
                        </Button>
                    </>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {ingredients && ingredients.length > 0 &&
                    <>
                        <div className="md:hidden">
                            {ingredients.map((ingredient: any, ingredientIndex: number) => (
                                <Card
                                    key={crypto.randomUUID()}
                                    className={
                                        (ingredient.isEdit ? "editing-item" : "") +
                                        " card-border-top mt-4"
                                    }
                                >
                                    <CardContent className="flex justify-between">
                                        <div>
                                            <span>
                                                Decrição:
                                            </span>
                                            <h6>
                                                {ingredient.description}
                                            </h6>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <Button
                                                variant="none"
                                                aria-label="delete"
                                                onClick={() => deleteIngredientItem(ingredientIndex)}
                                            >
                                                <Trash2 fontSize="large" />
                                            </Button>
                                            <Button
                                                variant="none"
                                                aria-label="edit"
                                                onClick={() => editIngredientItem(ingredientIndex)}
                                            >
                                                <Pencil fontSize="large" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <TableContainer className="hidden md:flex">
                            <Table aria-label="customized table">
                                <TableHead>
                                    <StyledTableThreadRow>
                                        <StyledTableThreadCell>Descrição</StyledTableThreadCell>
                                        <TableCell style={{ width: "20%" }} />
                                    </StyledTableThreadRow>
                                </TableHead>
                                <TableBody>
                                    {ingredients.map((ingredient: any, ingredientIndex: number) => (
                                        <TableRow
                                            className={ingredient.isEdit ? "editing-item" : ""}
                                            key={ingredient.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                {ingredient.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                <div className="flex">
                                                    <Button
                                                        variant="none"
                                                        aria-label="delete"
                                                        onClick={() => deleteIngredientItem(ingredientIndex)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </Button>
                                                    <Button
                                                        variant="none"
                                                        aria-label="edit"
                                                        onClick={() => editIngredientItem(ingredientIndex)}
                                                    >
                                                        <Pencil size={20} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </div>
        </div>
    );
};

export default AddIngredient;
