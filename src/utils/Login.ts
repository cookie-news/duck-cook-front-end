import { AuthRequest, AuthService } from "../data/auth.service";
import { User, UserService } from "../data/user.service";

const FIELD_ID_NAME = "user";

async function doLogin(
  body: AuthRequest
): Promise<{ token: string; userData: User }> {
  return AuthService.auth(body).then(({ token }) => {
    return UserService.getUser(FIELD_ID_NAME, body.user).then((userData) => ({
      token,
      userData,
    }));
  });
}

export const Login = {
  doLogin,
};
