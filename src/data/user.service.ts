import { COOKIE_AUTH_TOKEN } from "@context/AuthContext";

import { Cookies } from "@utils/Cookie";
import { ServiceError } from "@utils/Error";

import { AxiosHeaders, AxiosRequestConfig } from "axios";

import { CreateRegisterFormData } from "../app/auth/_components/RegisterForm";
import UserConfig from "./config/UserConfig";

export type FieldNameOptions = "_id" | "user" | "name" | "email";
export interface User {
  id: string;
  email: string;
  user: string;
  name: string;
  image: string;
}

async function getUser(fieldName: FieldNameOptions, value: string) {
  const endpoint = `/customer/${fieldName}/${value}`;

  try {
    const { data } = await UserConfig.get<User>(endpoint);
    return data;
  } catch (e: any) {
    throw new ServiceError(endpoint);
  }
}

async function createUser(body: CreateRegisterFormData) {
  const endpoint = "/customer";

  try {
    const { data } = await UserConfig.post(endpoint, body);
    return data;
  } catch (e: any) {
    throw new ServiceError(endpoint);
  }
}

export const UserService = {
  getUser,
  createUser,
};
