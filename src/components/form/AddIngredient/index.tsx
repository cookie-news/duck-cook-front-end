'use client'

import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";

//Material UI
import {
    TextField,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Table,
    TableCell,
    IconButton,
    Typography,
    CardContent,
    Card
} from "@mui/material";

import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Check as CheckIcon, Close as CloseIcon} from "@mui/icons-material";

import { StyledTableThreadRow, StyledTableThreadCell, StyledMenuItem } from './styles'

import './index.css';

//Form
import { IngredientForm } from "@forms/recipe/ingredient";
import { useForm } from "react-hook-form";

//Types
import IngredientType from "@/types/IngredientType";
import { FormType } from "@/types/FormType";

const AddIngredient = ({onChange = (newIngredients:Array<IngredientType>) => {}, ...props}) => {
    IngredientForm.map((form) => form.ref = useRef())

    const getDefaultIngredient = () => {
        return {
            name: '',
            quantity: '0',
            measure: ''
        } as IngredientType;
    }

    const [ingredients, setIngredients] = useState<IngredientType[]>(props.ingredients);
    let [ingredientEdit, setIngredientEdit] = useState<IngredientType>(getDefaultIngredient());

    // react hook form
    const { register, handleSubmit, reset, formState: { errors }, setFocus } = useForm();
    
    const updateIngredients = (newIngredients:Array<IngredientType>) => {
        setIngredients(newIngredients);
        onChange(newIngredients);
    }

    const resetIngredientItem = (ingredient:IngredientType) => {
        reset(ingredient);
        setIngredientEdit(ingredient);
    }

    const resetEditingIngredient = () => {
        let newIngredients = [...ingredients];

        newIngredients.map((ingredient:IngredientType) => {
            if(ingredient.isEdit) { ingredient.isEdit = false; }
        });

        updateIngredients(newIngredients);
        resetIngredientItem(getDefaultIngredient());
    }

    const addIngredientItem = (ingredient:any) => {
        ingredient.id = crypto.randomUUID();
        const newIngredients = [...ingredients, ingredient];

        updateIngredients(newIngredients);
        resetIngredientItem(getDefaultIngredient());
    }

    const deleteIngredientItem = (ingredientIndex:number) => {
        let newIngredients = [...ingredients];
        newIngredients.splice(ingredientIndex, 1);

        updateIngredients(newIngredients);
    }

    const editIngredientItem = (ingredientIndex:number) => {
        resetEditingIngredient();
        
        let newIngredients = [...ingredients];
        newIngredients[ingredientIndex].isEdit = true;
        updateIngredients(newIngredients);

        console.log(IngredientForm.find(x => x.name == 'name'))
        IngredientForm.find(x => x.name == 'name')?.ref?.current?.focus()
        resetIngredientItem(ingredients[ingredientIndex]);
    }

    const saveEditIngredientItem = (ingredient:any) => {
        resetEditingIngredient();

        let newIngredients = [...ingredients];
        let ingredientEditedIndex = newIngredients.findIndex(x => x.id == ingredient.id);
        ingredient.isEdit = false;
        newIngredients[ingredientEditedIndex] = ingredient;
        
        updateIngredients(newIngredients);
    }

    const ingredientFormMeasureOption = IngredientForm.find((x:FormType) => x.name == 'measure')?.options;

    return (
        <div className="p-2 max-h-96 overflow-y-auto">
            <div key={crypto.randomUUID()} className="flex flex-row flex-wrap md:grid md:grid-cols-3 gap-2 mt-4 mb-4">
                {
                    ingredientEdit &&
                    IngredientForm.map((form) => (
                        form.type === 'select'
                        ?
                            <TextField
                                select
                                key={crypto.randomUUID()}
                                label={form.label}
                                defaultValue={ingredientEdit[form.name as keyof IngredientType] || ''}
                                error={errors && !!errors[form.name as string]}
						        helperText={errors && errors[form.name as string]?.message as string}
                                {...register(form.name as string, form.validates)}
                                className="md:mt-0 mt-2"
                                fullWidth
                                inputRef={form.ref}
                                onChange={() => {}}
                            >
                                {form.options?.map((option:any) => (
                                    <StyledMenuItem key={crypto.randomUUID()+option.value} value={option.value}>
                                        {option.label}
                                    </StyledMenuItem>
                                ))}
                            </TextField>
                        :
                            <TextField
                                key={crypto.randomUUID()}
                                label={form.label}
                                placeholder={form.placeholder}
                                className="md:mt-0 mt-2"
                                type={form.type}
                                error={errors && !!errors[form.name as string]}
						        helperText={errors && errors[form.name as string]?.message as string}
                                {...register(form.name as string, form.validates)}
                                onChange={() => {}}
                                inputRef={form.ref}
                                fullWidth
                            />
                        )
                    )
                }
            </div>
            <div className="mt-4 mb-8 w-full flex justify-center ">
                {   
                    !ingredientEdit.isEdit 
                    ?
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleSubmit(addIngredientItem)}>
                            Adicionar Ingrediente
                        </Button>
                    :
                        <>
                            <Button variant="outlined" color="primary" className="mr-2" startIcon={<CheckIcon />} onClick={() => handleSubmit(saveEditIngredientItem)}>
                                Salvar
                            </Button>
                            <Button variant="outlined" color="error" startIcon={<CloseIcon />} onClick={() => handleSubmit(resetEditingIngredient)}>
                                Cancelar
                            </Button>
                        </>
                }
            </div>
            {
                ingredients.length > 0 &&
                (
                    isMobile
                    ?
                        <div>
                            {ingredients.map((ingredient:any, ingredientIndex:number) => (
                                <Card className={(ingredient.isEdit ? 'editing-item' : '') + ' card-border-top mt-4'}>
                                    <CardContent className="flex justify-between">
                                        <div>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Nome:
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {ingredient.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Quandidate:
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {ingredient.quantity}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Medida:
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {(ingredientFormMeasureOption?.find((x:any) => x.value == ingredient.measure).label)}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <IconButton aria-label="delete" onClick={() => deleteIngredientItem(ingredientIndex)}>
                                                <DeleteIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton aria-label="edit" onClick={() => editIngredientItem(ingredientIndex)}>
                                                <EditIcon fontSize="large" />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    :
                        <TableContainer>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <StyledTableThreadRow>
                                        <StyledTableThreadCell>Nome</StyledTableThreadCell>
                                        <StyledTableThreadCell align="left">Quandidate</StyledTableThreadCell>
                                        <StyledTableThreadCell align="left">Medida</StyledTableThreadCell>
                                        <TableCell style={{width: '20%'}} />
                                    </StyledTableThreadRow>
                                </TableHead>
                                <TableBody>
                                {ingredients.map((ingredient:any, ingredientIndex:number) => (
                                    <TableRow className={ingredient.isEdit ? 'editing-item' : ''} key={crypto.randomUUID()+ingredient.name}>
                                        <TableCell component="th" scope="row">{ingredient.name}</TableCell>
                                        <TableCell align="left">{ingredient.quantity}</TableCell>
                                        <TableCell align="left">{(ingredientFormMeasureOption?.find((x:any) => x.value == ingredient.measure).label)}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" onClick={() => deleteIngredientItem(ingredientIndex)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="edit" onClick={() => editIngredientItem(ingredientIndex)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                )
            }
        </div>
    )
}

export default AddIngredient;