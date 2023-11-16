'use client'

//Libs
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { set, useForm } from "react-hook-form";

//Material UI
import { TextField, Button } from "@mui/material";

//Custom components
import PasswordInput from "@components/form/PasswordInput";

//Imgs
const LOGO = "/assets/imgs/logo.png";

//Controller
import { callRegisterAuth } from "./controller";

//Forms
import { RegisterForm } from "@forms/auth/register";

import { authRoutes } from "@root/routes";
import ErrorMessages from "@utils/ErrorMessages";

const RegisterPage: NextPage = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	// react hook form
	const { register, handleSubmit, formState: { errors } } = useForm();

	const redirectToLoginPage = () => router.push(authRoutes.login.path);
	const redirectToHomePage = () => router.push("/");

	const onSubmitRegister = async (values: any) => {
		setLoading(true);
		callRegisterAuth(values);
	};

	return (
		<div className="flex flex-1 flex-col justify-center items-center content-center h-full w-full">
			<div className="w-fit">
				<img
					src={LOGO}
					alt="logo"
					onClick={redirectToHomePage}
					className="w-40 h-40"
				/>
			</div>
			<form className="mt-6 w-10/12 max-w-md">
				{RegisterForm.map((form) => form.type === "password" ? (
					<PasswordInput
						key={crypto.randomUUID()}
						{...form}
						registerInput={register}
						registerParams={{ required: ErrorMessages.REQUIRED }}
						error={errors && !!errors[form.name as string]}
						helperText={errors && errors[form.name as string]?.message as string}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
					/>
				) : (
					<TextField
						key={crypto.randomUUID()}
						label={form.label}
						placeholder={form.placeholder}
						className={form.className}
						error={errors && !!errors[form.name as string]}
						helperText={errors && errors[form.name as string]?.message as string}
						fullWidth
						{...register(form.name as string, { required: ErrorMessages.REQUIRED })}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
					/>
				))}
			</form>
			<div className="mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between">
				<div className="pb-1 md:pr-1 md:pb-0 w-full">
					<Button
						variant="contained"
						size="large"
						className="w-full"
						onClick={handleSubmit(onSubmitRegister)}
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