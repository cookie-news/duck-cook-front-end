import { FormType } from "@/types/FormType";
import ErrorMessages from "@utils/ErrorMessages";

export const RecipeForm: FormType[] = [
    {
        name: "title",
        placeholder: "",
        fullWidth: true,
        label: "Título",
        type: "text",
        className: "md:mt-4 mt-2",
        validates: {
            required: ErrorMessages.REQUIRED
        }
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
            required: ErrorMessages.REQUIRED
        }
    },
    {
        name: "methodPreparation",
        placeholder: "",
        fullWidth: true,
        label: "Modo de Preparo",
        type: "text",
        className: "mt-4",
        multiline: true,
        rows: 3,
        validates: {
            required: ErrorMessages.REQUIRED
        }
    },
    {
        name: "preparetionTime",
        placeholder: "",
        fullWidth: true,
        label: "Tempo de Preparo",
        type: "time",
        className: "mt-4",
        validates: {
            required: ErrorMessages.REQUIRED,
            min: {
                value: 0,
                message: 'Valor deve ser maior ou igual a zero.'
            }
        }
    },
];