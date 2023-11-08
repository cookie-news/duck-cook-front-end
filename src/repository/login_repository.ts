import configAxios from "./config_http"
import Cookies from 'js-cookie';

const axios = configAxios()


export async function auth(user: string, pass: string) {

    const resp = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/v1/auth/login`, {
        user,
        pass
    })

    Cookies.set("authorization", resp.data.token)
    return resp
}

export interface Customer {
    email: string
    pass: string
    user: string
    id?: string
}

export async function createUser(customer: Customer) {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/v1/customer`, customer)

    Cookies.set("authorization", resp.data.token)
    return resp
}