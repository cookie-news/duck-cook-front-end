"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { authRoutes, rootRoutes } from "@root/routes";
import { UserService } from "@root/src/data/user.service";

import Button from "@components/Button";
import { Input } from "@components/Input";

import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { z } from "zod";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("O campo de nome 'e obrigatório"),
  email: z
    .string()
    .email("O E-mail digitado é inválido")
    .nonempty("O campo de e-mail é obrigatório"),
  user: z.string().nonempty("O campo do usuário é obrigatório"),
  image: z.any(),
  pass: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve conter no mínimo 6 dígitos"),
});

export type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;

const RegisterForm: React.FC<any> = () => {
  const [imageName, setImageName] = useState(null);

  const { toggle: toggleLoading } = useContext(LoadingContext);

  const { isLogged } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  useEffect(() => {
    if (isLogged) {
      router.push(rootRoutes.home.path);
    }
  }, [isLogged, router]);

  const onSubmit = async (body: CreateRegisterFormData) => {
    toggleLoading();
    try {
      await UserService.createUser(body);
      toast.success("Usuário cadastrado com sucesso");

      router.push(authRoutes.login.path);
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
      <label className="w-full h-8 flex text-green-800 border border-green-800 rounded-md justify-evenly items-center cursor-pointer p-4">
        <Upload />
        {imageName ?? "Selecione uma imagem de perfil"}
        <input
          {...register("image", {
            onChange: (e) => setImageName(e.target.value),
          })}
          accept="image/*"
          id="contained-button-file"
          multiple
          className="hidden"
          type="file"
        />
      </label>
      <Input.Root>
        <Input.Textfield
          register={register}
          type="text"
          name="name"
          placeholder="Nome completo"
        />
      </Input.Root>
      {errors.name && <Input.Error>{errors.name.message}</Input.Error>}
      <Input.Root>
        <Input.Textfield
          register={register}
          type="email"
          name="email"
          placeholder="Email"
        />
      </Input.Root>
      {errors.email && <Input.Error>{errors.email.message}</Input.Error>}

      <Input.Root>
        <Input.Textfield
          register={register}
          type="text"
          name="user"
          placeholder="Nome de usuário (único)"
        />
      </Input.Root>
      {errors.user && <Input.Error>{errors.user.message}</Input.Error>}

      <Input.Root>
        <Input.Textfield
          register={register}
          type="password"
          name="pass"
          placeholder="Senha"
          autoComplete="on"
        />
      </Input.Root>
      {errors.pass && <Input.Error>{errors.pass.message}</Input.Error>}

      <Input.Root>
        <Input.Textfield
          type="password"
          name="confirm-pass"
          placeholder="Confirmar senha"
          autoComplete="on"
        />
      </Input.Root>

      <Button>Cadastrar</Button>
    </form>
  );
};

export default RegisterForm;
