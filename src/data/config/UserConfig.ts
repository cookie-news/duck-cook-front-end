import axios from "axios";

const UserConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_URL || "",
  withCredentials: true,
});

export default UserConfig;
