import { FormType } from "@/types/FormType";

export const LoginForm: FormType[] = [
  {
    name: "user",
    placeholder: "Ex: usuario",
    fullWidth: true,
    label: "Usuário",
    type: "text"
  },
  {
    name: "pass",
    placeholder: "********",
    fullWidth: true,
    type: "password",
    label: "Senha",
    className: "mt-4"
  },
];