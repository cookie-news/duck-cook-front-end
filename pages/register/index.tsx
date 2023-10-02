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

    const onChangeFullName = (event) => setFullName(event.currentTarget.value)
    const onChangeEmail = (event) => setEmail(event.currentTarget.value)
    const onChangeUserName = (event) => setUserName(event.currentTarget.value)
    const onChangePassword = (event) => setPassword(event.currentTarget.value)
    const onChangePasswordConfirm = (event) => setPasswordConfirm(event.currentTarget.value)

    const redirectToLoginPage = () => push('/login')

    return (
        <div className='flex flex-col justify-center items-center content-center h-screen w-screen'>
            <div name='logo' className='w-fit'>
                <img src={LOGO} alt='logo' style={{
                    width: '150px',
                    height: '150px'
                }} />
            </div>
            <div name='form' className='mt-12 w-10/12 max-w-md'>
                <TextField label='Nome completo' placeholder='Fulano de Sicrano' onChange={onChangeFullName} fullWidth />
                <TextField label='Email' placeholder='example@www.com' className='mt-4' onChange={onChangeEmail} fullWidth />
                <TextField label='Usuário' placeholder='usuario' className='mt-4' onChange={onChangeUserName} fullWidth />
                <PasswordInput label='Senha' placeholder='********' className='mt-4' onChange={onChangePassword} />
                <PasswordInput label='Confirmar Senha' placeholder='********' className='mt-4' onChange={onChangePasswordConfirm} />
            </div>
            <div name='action-buttons' className='mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between'>
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