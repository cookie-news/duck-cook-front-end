import React from 'react';
import { useRouter } from 'next/navigation';

//Material UI
import TextField from '@mui/material/TextField';

//Custom
import PasswordInput from '@/components/form/PasswordInput';
import {ButtonPrimary, ButtonSecondary, ButtonText} from '@/components/buttons/Buttons'

//Imgs
const LOGO = '/assets/imgs/logo.png'

export default function RegisterPage() 
{
    const { push } = useRouter();

    const [fullName, setFullName] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [userName, setUserName] = React.useState(false);
    const [password, setPassword] = React.useState(false);
    const [passwordConfirm, setPasswordConfirm] = React.useState(false);

    const onChangeFullName = (event:any) => setFullName(event.currentTarget.value)
    const onChangeEmail = (event:any) => setEmail(event.currentTarget.value)
    const onChangeUserName = (event:any) => setUserName(event.currentTarget.value)
    const onChangePassword = (event:any) => setPassword(event.currentTarget.value)
    const onChangePasswordConfirm = (event:any) => setPasswordConfirm(event.currentTarget.value)

    const redirectToLoginPage = () => push('/login')

    return (
        <div className='flex flex-col justify-center items-center content-center h-screen w-screen'>
            <div className='w-fit'>
                <img src={LOGO} alt='logo' style={{
                    width: '150px',
                    height: '150px'
                }} />
            </div>
            <div className='mt-12 w-10/12 max-w-md'>
                <TextField label='Nome completo' placeholder='Fulano de Sicrano' onChange={onChangeFullName} fullWidth />
                <div className='mt-4'>
                    <TextField label='Email' placeholder='example@www.com' onChange={onChangeEmail} fullWidth />
                </div>
                <div className='mt-4'>
                    <TextField label='Usuário' placeholder='usuario' onChange={onChangeUserName} fullWidth />
                </div>
                <div className='mt-4'>
                    <PasswordInput label='Senha' placeholder='********' onChange={onChangePassword} />
                </div>
                <div className='mt-4'>
                    <PasswordInput label='Confirmar Senha' placeholder='********' onChange={onChangePasswordConfirm} />
                </div>
            </div>
            <div className='mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between'>
                <div className='pb-1 md:pr-1 md:pb-0 w-full'>
                    <ButtonPrimary variant='contained' size='large' className='w-full'>CRIAR CONTA</ButtonPrimary>
                </div>
                <div className='pt-1 md:pl-1 md:pt-0 w-full'>
                    <ButtonSecondary variant='outlined' size='large' className='w-full' onClick={redirectToLoginPage}>JÁ TENHO CONTA</ButtonSecondary>
                </div>
            </div>
        </div>
    )
}