import { auth } from "@root/src/repository/login_repository";

export const callLoginAuth = async (loginInfo: any) => {
    try {
        const { user, pass } = loginInfo
        return auth(user, pass);
    } catch (err) {
        console.log(err);
    }
}