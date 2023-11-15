import { ServiceError } from "@utils/Error";

import Api from "./axios.config";
import { AxiosHeaders, AxiosRequestConfig } from "axios";

const base_url = process.env.NEXT_PUBLIC_USER_URL;

export type FieldNameOptions = "_id" | "user" | "name" | "email";
export interface User {
  id: string;
  email: string;
  user: string;
  name: string;
  image: string;
}

async function getUserData(
  fieldName: FieldNameOptions,
  value: string,
  token?: string
) {
  const endpoint = `${base_url}/customer/${fieldName}/${value}`;
  const axiosOpts: AxiosRequestConfig<AxiosHeaders> = token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};
  try {
    const { data } = await Api.get<User>(endpoint, axiosOpts);
    return data;
  } catch (e: any) {
    throw new ServiceError(endpoint);
  }
}

export const UserService = {
  getUserData,
};
