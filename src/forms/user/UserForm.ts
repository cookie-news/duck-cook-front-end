import ErrorMessages from "@utils/ErrorMessages";

//Types
import { FormType } from "@/types/FormType";

export const UserForm: FormType[] = [
    {
        name: "fullName",
        placeholder: "",
        fullWidth: true,
        label: "Nome completo",
        type: "text",
        className: "md:mt-1 mt-4",
        validates: {
            required: ErrorMessages.REQUIRED
        }
    },
    {
        name: "userName",
        placeholder: "",
        fullWidth: true,
        label: "Nome do Usuário",
        type: "text",
        className: "mt-4",
        validates: {
            required: ErrorMessages.REQUIRED
        }
    },
    {
        name: "email",
        placeholder: "",
        fullWidth: true,
        label: "Email",
        type: "email",
        className: "mt-4",
        validates: {
            required: ErrorMessages.REQUIRED
        }
    }
];