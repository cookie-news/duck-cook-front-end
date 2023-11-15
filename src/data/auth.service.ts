import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  user: string;
  pass: string;
}

async function auth(body: AuthRequest) {
  try {
    const { data } = await axios.post<AuthResponse>(
      baseUrl + "/auth/login",
      body
    );
    return data;
  } catch (e: any) {
    throw new Error(e.response?.message ?? "Erro na autenticação");
  }
}

export const AuthService = {
  auth,
};
