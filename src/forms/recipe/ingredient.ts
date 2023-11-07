import { FormType } from "@types/FormType";
import ErrorMessages from "@utils/ErrorMessages";

export const IngredientForm: FormType[] = [
    {
        name: "name",
        placeholder: "",
        fullWidth: true,
        label: "Nome:",
        type: "text",
        validates: {
            required: ErrorMessages.REQUIRED
        }
    },
    {
        name: "quantity",
        placeholder: "",
        fullWidth: true,
        label: "Quantidade:",
        validates: {
            required: ErrorMessages.REQUIRED,
            min: {
                value: 1,
                message: "Quantidade deve ser maior que zero."
            }
        },
        type: "number"
    },
    {
        name: "measure",
        placeholder: "",
        fullWidth: true,
        label: "Medida:",
        type: "select",
        validates: {
            required: ErrorMessages.REQUIRED
        },
        options: [
            {
                label: 'Escolha uma opção',
                value: ''
            },
            {
                label: 'Colher',
                value: 'Colher(es)'
            },
            {
                label: 'Xicara',
                value: 'Xicara(s)'
            },
            {
                label: 'Gramas',
                value: 'gm'
            },
            {
                label: 'Quilogramas',
                value: 'kg'
            },
            {
                label: 'Litros',
                value: 'L'
            },
            {
                label: 'Mililitros',
                value: 'mL'
            }
        ]
    }
];