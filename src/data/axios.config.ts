import axios from "axios";

import { Cookies } from "@utils/Cookie";

import { COOKIE_AUTH_TOKEN } from "@context/AuthContext";

const Api = axios.create({
  headers: {
    Authorization: "Bearer " + Cookies.get(COOKIE_AUTH_TOKEN),
  },
});

export default Api;
