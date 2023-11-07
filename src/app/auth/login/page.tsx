'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

//Material UI
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

//Custom
import PasswordInput from "@components/form/PasswordInput";

import styles from "./login.module.css";

//Imgs
const LOGO = "/assets/imgs/logo.png";

//Controller
import { callLoginAuth } from "./controller";

import { authRoutes } from "@root/routes";

// forms
import { LoginForm } from "@forms/auth/login";
import { useForm } from "react-hook-form";

const LoginPage: NextPage = () => {
  // routers
  const router = useRouter();

  // react hook form
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const redirectToRegisterPage = () => router.push(authRoutes.register.path);
  const redirectToHomePage = () => router.push("/");

  const onSubmitLogin = async (values: any) => {
    try {
      const result = await callAuthEnpoint(values);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const callAuthEnpoint = async ({ user, pass }: any) => {
    setLoading(true);
    let response = await callLoginAuth({
      user,
      pass,
    });

    setLoading(false);
    if (response.error) {
      setToast({
        open: true,
        type: "error",
        message: response.error,
      });
      return;
    }

    setToast({
      open: true,
      type: "success",
      message: "Login efetuado com sucesso!!",
    });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center content-center h-full w-full">
      <div className="w-fit">
        <img
          src={LOGO}
          alt="logo"
          onClick={redirectToHomePage}
          style={{
            width: "264px",
            height: "264px",
          }}
        />
      </div>
      {loading ? (
        <div
          className={`flex justify-center items-center h-screen w-screen z-10 absolute ${styles["screen-grey-transparent"]}`}
        >
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
      <form className="mt-6 w-10/12 max-w-md">
        {LoginForm.map((form) =>
          form.type === "password" ? (
            <PasswordInput
              key={crypto.randomUUID()}
              {...form}
              registerInput={register}
            />
          ) : (
            <TextField
              key={crypto.randomUUID()}
              label={form.label}
              placeholder={form.placeholder}
              fullWidth
              {...register(form.name as string)}
            />
          )
        )}
      </form>
      <div className="mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between">
        <div className="pb-1 md:pr-1 md:pb-0 w-full">
          <Button
            variant="contained"
            size="large"
            className="w-full"
            onClick={handleSubmit(onSubmitLogin)}
          >
            ENTRAR
          </Button>
        </div>
        <div className="pt-1 md:pl-1 md:pt-0 w-full">
          <Button
            variant="outlined"
            size="large"
            className="w-full"
            onClick={redirectToRegisterPage}
          >
            CRIAR CONTA
          </Button>
        </div>
        <Button variant="text" size="small" className="w-fit p-0 mt-1">
          ESQUECEU SUA SENHA?
        </Button>
      </div>

      <Snackbar open={toast.open} autoHideDuration={1000}>
        <Alert
          severity={
            toast.type == "success"
              ? "success"
              : toast.type == "error"
              ? "error"
              : "info"
          }
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
