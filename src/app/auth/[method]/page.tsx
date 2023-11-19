import { ElementType } from "react";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { authRoutes } from "@root/routes";

import PageWrapper from "@components/PageWrapper";

import LoginForm from "../_components/LoginForm";
import RegisterForm from "../_components/RegisterForm";

type AuthPageProps = {
  params: {
    method: "register" | "login";
  };
};

function Form({ form: Form }: { form: ElementType }) {
  return <Form />;
}

const AuthPage: NextPage<AuthPageProps> = ({ params }) => {
  const FormOptions = {
    register: RegisterForm,
    login: LoginForm,
  };

  return (
    <PageWrapper isProtected={false}>
      <div className="flex flex-col gap-6 w-full h-[100vh] justify-center items-center">
        <Image
          src="/assets/imgs/logo.png"
          width={264}
          height={264}
          alt="duck cook logo"
        />
        <Form form={FormOptions[params.method]} />
        <Link
          className="text-blue-700 underline"
          href={
            authRoutes[params.method == "register" ? "login" : "register"].path
          }
        >
          {params.method == "login"
            ? "Ainda não tenho uma conta"
            : "Já tenho uma conta"}
        </Link>
      </div>
    </PageWrapper>
  );
};

export default AuthPage;
