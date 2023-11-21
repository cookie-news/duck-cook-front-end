import { FormType } from "@/types/FormType";

export const RecipeForm: FormType[] = [
  {
    name: "title",
    placeholder: "",
    fullWidth: true,
    label: "Título",
    type: "text",
    className: "md:mt-4 mt-2",
    validates: {
      required: "Campo Obrigatório",
    },
  },
  {
    name: "description",
    placeholder: "",
    fullWidth: true,
    label: "Descrição",
    type: "text",
    className: "mt-4",
    multiline: true,
    rows: 3,
    validates: {
      required: "Campo Obrigatório",
    },
  },
  {
    name: "preparationMethod",
    placeholder: "",
    fullWidth: true,
    label: "Modo de Preparo",
    type: "text",
    className: "mt-4",
    multiline: true,
    rows: 3,
    validates: {
      required: "Campo Obrigatório",
    },
  },
  {
    name: "preparetionTime",
    placeholder: "",
    fullWidth: true,
    label: "Tempo de Preparo",
    type: "time",
    className: "mt-4",
    validates: {
      required: "Campo Obrigatório",
      min: {
        value: 0,
        message: "Valor deve ser maior ou igual a zero.",
      },
    },
  },
];
