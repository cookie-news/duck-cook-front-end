import axios from "axios";

export default function createAxios() {
    const configAxios = axios.create()
    return configAxios
}