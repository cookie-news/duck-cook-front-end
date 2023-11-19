"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { rootRoutes } from "@root/routes";

import Button from "@components/Button";
import { Input } from "@components/Input";

import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import { Login } from "@utils/Login";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const createLoginFormSchema = z.object({
  user: z.string().nonempty("O campo de usuário é obrigatório"),
  pass: z.string().nonempty("O campo de senha é obrigatório"),
});

type CreateLoginFormData = z.infer<typeof createLoginFormSchema>;

const LoginForm: React.FC<any> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { setAuthData, isLogged } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  });

  const { toggle: toggleLoading } = useContext(LoadingContext);

  const toggleShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword((state) => !state);
  };

  useEffect(() => {
    if (isLogged) {
      router.push(rootRoutes.home.path);
    }
  }, [isLogged, router]);

  const onSubmit = async (e: CreateLoginFormData) => {
    toggleLoading();
    try {
      const { token, userData } = await Login.doLogin(e);
      setAuthData(token, userData);
      router.push(rootRoutes.home.path);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      toggleLoading();
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input.Root>
        <Input.Textfield
          name="user"
          register={register}
          type="text"
          placeholder="Digite o seu usuário"
        />
      </Input.Root>
      {errors.user && <Input.Error>{errors.user.message}</Input.Error>}

      <Input.Root>
        <Input.Textfield
          name="pass"
          register={register}
          type={showPassword ? "text" : "password"}
          placeholder="Digite aqui sua senha"
          autoComplete="on"
        />
        <Input.Button onClick={toggleShowPassword}>
          <Input.Icon icon={showPassword ? EyeOff : Eye} />
        </Input.Button>
      </Input.Root>
      {errors.pass && <Input.Error>{errors.pass.message}</Input.Error>}

      <Button>Entrar</Button>
    </form>
  );
};

export default LoginForm;
