import axios from "axios";
import { Cookies } from "@utils/Cookie";

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;

export const COOKIE_AUTH_TOKEN = "COOKIE_AUTH_TOKEN";

interface AuthResponse {
  token: string;
}

interface AuthRequest {
  user: string;
  pass: string;
}

async function auth(body: AuthRequest) {
  try {
    const { data } = await axios.post<AuthResponse>(
      baseUrl + "/auth/login",
      body
    );
    Cookies.set(COOKIE_AUTH_TOKEN, data.token);
    return data;
  } catch (e: any) {
    throw new Error(e.response?.message ?? "Erro na autenticação");
  }
}

export const Auth = {
  auth,
};
