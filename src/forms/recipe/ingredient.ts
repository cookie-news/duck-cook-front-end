import { FormType } from "@/types/FormType";

export const IngredientForm: FormType[] = [
  {
    name: "name",
    placeholder: "",
    fullWidth: true,
    label: "Nome:",
    type: "text",
    validates: {
      required: "Campo obrigatório",
    },
  },
  {
    name: "quantity",
    placeholder: "",
    fullWidth: true,
    label: "Quantidade:",
    validates: {
      required: "Campo obrigatório",
      min: {
        value: 1,
        message: "Quantidade deve ser maior que zero.",
      },
    },
    type: "number",
  },
  {
    name: "measure",
    placeholder: "",
    fullWidth: true,
    label: "Medida:",
    type: "select",
    validates: {
      required: "Campo obrigatório",
    },
    options: [
      {
        label: "Escolha uma opção",
        value: "",
      },
      {
        label: "Colher",
        value: "Colher(es)",
      },
      {
        label: "Xicara",
        value: "Xicara(s)",
      },
      {
        label: "Gramas",
        value: "gm",
      },
      {
        label: "Quilogramas",
        value: "kg",
      },
      {
        label: "Litros",
        value: "L",
      },
      {
        label: "Mililitros",
        value: "mL",
      },
    ],
  },
];
