import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';

//Material UI
import { TextField, Button, CircularProgress } from '@mui/material'

//Custom
import PasswordInput from '@/components/form/PasswordInput';

import styles from './login.module.css';

//Imgs
const LOGO = '/assets/imgs/logo.png'

//Controller
import { callLoginAuth } from '@/controllers/login/controller'

const LoginPage:NextPage = () =>
{
    const router = useRouter()

    const [password, setPassword] = useState(false)
    const [userName, setUserName] = useState(false)

    const [loading, setLoading] = useState(false);

    const onChangePassword = (event:any) => setPassword(event.currentTarget.value)
    const onChangeUserName = (event:any) => setUserName(event.currentTarget.value)

    const redirectToRegisterPage = () => router.push('/register')
    const redirectToHomePage = () => router.push('/')

    const onClickLogin = async () => {
        setLoading(true)
        let response = await callLoginAuth({
            user: userName,
            pass: password
        })
    }

    return (
        <div className='flex flex-col justify-center items-center content-center h-screen w-screen'>
            <div className='w-fit'>
                <img src={LOGO} alt='logo' onClick={redirectToHomePage} style={{
                    width: '264px',
                    height: '264px'
                }} />
            </div>
            {loading ? <div className={`flex justify-center items-center h-screen w-screen z-10 absolute ${styles['screen-grey-transparent']}`}><CircularProgress /></div> : <></>}
            <div className='mt-6 w-10/12 max-w-md'>
                <TextField label='Usuário' placeholder='usuario' onChange={onChangeUserName} fullWidth />
                <div className='mt-4'>
                    <PasswordInput label='Senha' placeholder='********' onChange={onChangePassword} />
                </div>
            </div>
            <div className='mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between'>
                <div className='pb-1 md:pr-1 md:pb-0 w-full'>
                    <Button variant='contained' size='large' className='w-full' onClick={onClickLogin}>ENTRAR</Button>
                </div>
                <div className='pt-1 md:pl-1 md:pt-0 w-full'>
                    <Button variant='outlined' size='large' className='w-full' onClick={redirectToRegisterPage}>CRIAR CONTA</Button>
                </div>
                <Button variant='text' size='small' className='w-fit p-0 mt-1'>ESQUECEU SUA SENHA?</Button>
            </div>
        </div>
    )
}

export default LoginPage;