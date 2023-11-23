import { COOKIE_AUTH_TOKEN } from "@context/AuthContext";

import { Cookies } from "@utils/Cookie";

import axios from "axios";

const RecipeConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RECIPE_URL || "",
  headers: {
    Authorization: "Bearer " + Cookies.get(COOKIE_AUTH_TOKEN),
  },
});

export default RecipeConfig;
