"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { authRoutes, recipeRoutes, userRoutes } from "@root/routes";
//Data services
import { RecipeService } from "@root/src/data/recipe.service";

import Button from "@components/Button";
//Custom Components
import Card from "@components/Card";
import AddIngredient from "@components/form/AddIngredient";
import InputDropzone from "@components/form/InputDropzone";
import { Input } from "@components/Input";
import PageWrapper from "@components/PageWrapper";

//Contexts
import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import { Date } from "@utils/Date";

import "react-quill/dist/quill.snow.css";
import { RecipeFactory } from "@/types/Recipe";
//Types
import { ToastType } from "@/types/ToastType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createRecipeFormSchema = z.object({
  title: z.string().nonempty("O campo é obrigatório."),
  description: z.string().nonempty("O campo é obrigatório."),
  images: z.any(),
  preparationTimeHours: z.coerce
    .number()
    .min(0, "O valor não pode ser negativo."),
  preparationTimeMinutes: z.coerce
    .number()
    .min(0, "O valor não pode ser negativo."),
});

type CreateIngredientFormData = z.infer<typeof createRecipeFormSchema>;

interface RecipeForm extends CreateIngredientFormData {
  ingredients: Array<any>;
  description: string;
  preparationMethod: string;
}

const RecipePage = ({
  params,
  searchParams,
}: {
  params: { method: string };
  searchParams: { id: string };
}) => {
  // routers
  const router = useRouter();

  //Loading
  var { toggle: handleLoadingDialog } = useContext(LoadingContext);

  //User
  const { userData, token } = useContext(AuthContext);

  const cardLabelRecipeData =
    params?.method == "create" ? "Criar Receita" : "Editar Receita";
  const cardLabelIngredientData =
    params?.method == "create"
      ? "Adicionar Ingredientes"
      : "Editar/Adicionar Ingredientes";

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateIngredientFormData>({
    resolver: zodResolver(createRecipeFormSchema),
  });

  const [customErrors, setCustomErrors] = useState<any>();

  const [stateRecipe, setStateRecipe] = useState("setRecipe");
  let [recipe, setRecipe] = useState<RecipeForm>({} as RecipeForm);

  const onNextStateRecipe = (values: any) => {
    verifyRichTextsInputs();

    if (customErrors && Object.keys(customErrors).length > 0) {
      return;
    }

    setStateRecipe("addIngredients");

    let newRecipe = { ...recipe };

    setRecipe(Object.assign(newRecipe, values));
  };

  const onBackStateRecipe = () => {
    if (stateRecipe == "setRecipe") {
      router.back();
    } else {
      setStateRecipe("setRecipe");
    }
  };

  const handlerChangePreparationMethod = (value: string) => {
    let newRecipe = { ...recipe };
    newRecipe.preparationMethod = value;
    console.log(newRecipe);
    setRecipe(newRecipe);
    clearCustomErrorByInputName("preparationMethod");
  };

  const verifyRichTextsInputs = () => {
    let newCustomErrors: any = {};

    if (!replaceTagsByText(recipe?.preparationMethod as string)) {
      newCustomErrors.preparationMethod = "O campo é obrigatório.";
    }

    setCustomErrors(newCustomErrors);
  };

  const replaceTagsByText = (text: string) => {
    return text?.replace(/(<([^>]+)>)/gi, "").trim();
  };

  const clearCustomErrorByInputName = (name: string) => {
    let newCustomErrors = { ...customErrors };
    delete newCustomErrors[name];
    setCustomErrors(newCustomErrors);
  };

  const handlerSaveRecipe = async () => {
    handleLoadingDialog();

    let recipeRequest = RecipeFactory.createRecipeByRecipeForm(
      recipe,
      userData.id
    );

    if (params?.method == "edit") {
      RecipeService.updateRecipe(recipeRequest, searchParams?.id, token)
        .then((sucess) => {
          toast.success("Receita editada com sucesso!!");
          router.push(userRoutes.view.path);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          handleLoadingDialog();
        });
    } else {
      RecipeService.createRecipe(recipeRequest, token)
        .then((sucess) => {
          toast.success("Receita criada com sucesso!!");
          router.push(userRoutes.view.path);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          handleLoadingDialog();
        });
    }
  };

  const onChangeIngredients = (value: any) => {
    let newRecipe = { ...recipe };

    newRecipe.ingredients = value;

    setRecipe(newRecipe);
  };

  const getRecipe = (recipeId: string) => {
    handleLoadingDialog();

    RecipeService.getRecipe(recipeId)
      .then((data: any) => {
        setValue("title", data.title);
        setValue("description", data.description);

        const preparationTimeNumbers: any = Date.separateParseHoursAndMinutes(
          data.preparationTime
        );

        data.preparationTimeHours = preparationTimeNumbers.hours;
        data.preparationTimeMinutes = preparationTimeNumbers.minutes;

        setValue("preparationTimeHours", preparationTimeNumbers.hours);
        setValue("preparationTimeMinutes", preparationTimeNumbers.minutes);

        delete data.images;

        data.ingredients = data.ingredients.map((ingredient: string) => {
          return { id: crypto.randomUUID(), description: ingredient };
        });

        setRecipe(data);
      })
      .finally(() => {
        handleLoadingDialog();
      });
  };

  useEffect(() => {
    if (params?.method == "edit" && searchParams && searchParams.id) {
      getRecipe(searchParams.id);
    }
  }, []);

  return (
    <PageWrapper hasMenu>
      <Card
        title={
          stateRecipe === "setRecipe"
            ? cardLabelRecipeData || ""
            : cardLabelIngredientData || ""
        }
      >
        {stateRecipe === "setRecipe" ? (
          <form>
            <div
              className={
                "flex flex-col gap-2 " +
                (params.method != "edit" && "md:grid-rows-2")
              }
            >
              <div className="w-full">
                <h2 className="text-gray-600">Informações da receita:</h2>

                <Input.Label className="mt-1" text="Titulo" />
                <Input.Root>
                  <Input.Textfield
                    name="title"
                    register={register}
                    defaultValue={recipe?.title}
                    type="text"
                    placeholder="Digite o titulo da receita"
                  />
                </Input.Root>
                {errors.title && (
                  <Input.Error>{errors.title.message}</Input.Error>
                )}

                <Input.Label className="mt-3" text="Descrição" />
                <Input.Root>
                  <Input.TextArea
                    rows={3}
                    name="description"
                    register={register}
                    value={recipe?.description}
                    placeholder="Digite sua descrição aqui..."
                  />
                </Input.Root>
                {errors.description && (
                  <Input.Error>{errors.description.message}</Input.Error>
                )}

                <Input.Label className="mt-3" text="Modo de preparo" />
                {document && (
                  <ReactQuill
                    theme="snow"
                    value={recipe?.preparationMethod}
                    placeholder="Digite aqui..."
                    onChange={handlerChangePreparationMethod}
                  />
                )}
                {customErrors?.preparationMethod && (
                  <Input.Error>{customErrors?.preparationMethod}</Input.Error>
                )}

                <Input.Label className="mt-3" text="Tempo de preparo" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input.Root>
                      <Input.Textfield
                        name="preparationTimeHours"
                        register={register}
                        defaultValue={recipe?.preparationTimeHours}
                        type="number"
                        placeholder="Horas"
                      />
                    </Input.Root>
                    {errors.preparationTimeHours && (
                      <Input.Error>
                        {errors.preparationTimeHours.message}
                      </Input.Error>
                    )}
                  </div>
                  <div>
                    <Input.Root>
                      <Input.Textfield
                        name="preparationTimeMinutes"
                        register={register}
                        defaultValue={recipe?.preparationTimeMinutes}
                        type="number"
                        placeholder="Minutos"
                      />
                    </Input.Root>
                    {errors.preparationTimeMinutes && (
                      <Input.Error>
                        {errors.preparationTimeMinutes.message}
                      </Input.Error>
                    )}
                  </div>
                </div>
              </div>
              {params?.method != "edit" && (
                <div className="flex flex-col w-full h-64">
                  <InputDropzone
                    label="Imagens da receita:"
                    name="images"
                    register={register}
                    files={recipe.images}
                  />
                </div>
              )}
            </div>
          </form>
        ) : (
          recipe && (
            <AddIngredient
              ingredients={recipe?.ingredients}
              onChange={onChangeIngredients}
            />
          )
        )}
        <>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={
                stateRecipe === "setRecipe"
                  ? handleSubmit(onNextStateRecipe)
                  : handleSubmit(handlerSaveRecipe)
              }
            >
              {stateRecipe === "setRecipe" ? "AVANÇAR" : "SALVAR"}
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="secondary"
              className="w-full"
              onClick={onBackStateRecipe}
            >
              {stateRecipe === "addIngredients" ? "VOLTAR" : "CANCELAR"}
            </Button>
          </div>
        </>
      </Card>
    </PageWrapper>
  );
};

export default RecipePage;
