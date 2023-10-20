import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

//Material UI
import { TextField, Button } from "@mui/material";

//Custom
import PasswordInput from "@root/app/components/form/PasswordInput";

//Imgs
const LOGO = "/assets/imgs/logo.png";

//Controller
import { callRegisterAuth } from "@/controllers/register/controller";
import { authRoutes } from "@root/routes";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const [registerInfo, setRegisterInfo] = useState({
    fullName: {
      required: true,
      error: false,
      helperText: "",
    },
    email: {
      required: true,
      error: false,
      helperText: "",
    },
    userName: {
      required: true,
      error: false,
      helperText: "",
    },
    password: {
      required: true,
      error: false,
      helperText: "",
    },
    confirmPassword: {
      required: true,
      error: false,
      helperText: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onChangeInput = (event: any) => {
    let changeInfos: any = registerInfo;
    changeInfos[event.currentTarget.name]["value"] = event.currentTarget.value;
    setRegisterInfo(registerInfo);
  };

  const redirectToLoginPage = () => router.push(authRoutes.login.path);
  const redirectToHomePage = () => router.push("/");

  const onClickRegister = async () => {
    setLoading(true);
    callRegisterAuth(registerInfo);
    setRegisterInfo(registerInfo);
  };

  return (
    <div className="flex flex-col justify-center items-center content-center h-screen w-screen">
      <div className="w-fit">
        <img
          src={LOGO}
          alt="logo"
          onClick={redirectToHomePage}
          style={{
            width: "150px",
            height: "150px",
          }}
        />
      </div>
      <div className="mt-6 w-10/12 max-w-md">
        <TextField
          label="Nome completo"
          placeholder="Fulano de Sicrano"
          helperText={registerInfo.fullName.helperText}
          error={registerInfo.fullName.error}
          required={registerInfo.fullName.required}
          name="fullName"
          onChange={onChangeInput}
          fullWidth
        />
        <div className="mt-4">
          <TextField
            label="Email"
            placeholder="example@www.com"
            error={registerInfo.email.error}
            helperText={registerInfo.fullName.helperText}
            required={registerInfo.email.required}
            name="email"
            onChange={onChangeInput}
            fullWidth
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Usuário"
            placeholder="usuario"
            error={registerInfo.userName.error}
            helperText={registerInfo.fullName.helperText}
            required={registerInfo.userName.required}
            name="userName"
            onChange={onChangeInput}
            fullWidth
          />
        </div>
        <div className="mt-4">
          <PasswordInput
            label="Senha"
            placeholder="********"
            error={registerInfo.password.error}
            helperText={registerInfo.fullName.helperText}
            required={registerInfo.password.required}
            name="password"
            onChange={onChangeInput}
          />
        </div>
        <div className="mt-4">
          <PasswordInput
            label="Confirmar Senha"
            placeholder="********"
            error={registerInfo.password.error}
            helperText={registerInfo.fullName.helperText}
            required={registerInfo.confirmPassword.required}
            name="confirmPassword"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between">
        <div className="pb-1 md:pr-1 md:pb-0 w-full">
          <Button
            variant="contained"
            size="large"
            className="w-full"
            onClick={onClickRegister}
          >
            Criar conta
          </Button>
        </div>
        <div className="pt-1 md:pl-1 md:pt-0 w-full">
          <Button
            variant="outlined"
            size="large"
            className="w-full"
            onClick={redirectToLoginPage}
          >
            JÁ TENHO CONTA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
