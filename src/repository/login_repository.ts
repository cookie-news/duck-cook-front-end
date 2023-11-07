import configAxios from "./config_http"
import { cookies } from 'next/headers'

const axios = configAxios()


export async function auth(user: string, password: string) {

    const resp = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/v1/auth/login`, {
        user,
        password
    })

    const cookieStore = cookies()
    cookieStore.set("authorization", resp.data.token)
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

    const cookieStore = cookies()
    cookieStore.set("authorization", resp.data.token)
    return resp
}