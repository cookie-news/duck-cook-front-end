
import { FormType } from "@types/FormType";

export const RegisterForm: FormType[] = [
    {
        name: "fullName",
        placeholder: "Ex: Fulano de Sicrano",
        fullWidth: true,
        label: "Nome completo",
        type: "text"
    },
    {
        name: "email",
        placeholder: "Ex: example@www.com",
        fullWidth: true,
        label: "Email",
        type: "email",
        className: "mt-4"
    },
    {
        name: "userName",
        placeholder: "Ex: usuario",
        fullWidth: true,
        label: "Usuário",
        type: "text",
        className: "mt-4"
    },
    {
        name: "pass",
        placeholder: "********",
        fullWidth: true,
        type: "password",
        label: "Senha",
        className: "mt-4"
    },
    {
        name: "confirmPassword",
        placeholder: "********",
        fullWidth: true,
        type: "password",
        label: "Confirmar Senha",
        className: "mt-4"
    }
];  