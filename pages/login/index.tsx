import React from 'react';
import { useRouter } from 'next/navigation';

//Material UI
import TextField from '@mui/material/TextField';

//Custom
import PasswordInput from '@/components/form/PasswordInput';
import {ButtonPrimary, ButtonSecondary, ButtonText} from '@/components/buttons/Buttons'

//Imgs
const LOGO = '/assets/imgs/logo.png'

export default function LoginPage() 
{
    const { push } = useRouter();

    const [password, setPassword] = React.useState(false);
    const [userName, setUserName] = React.useState(false);

    const onChangePassword = (event:any) => setPassword(event.currentTarget.value)
    const onChangeUserName = (event:any) => setUserName(event.currentTarget.value)

    const redirectToRegisterPage = () => push('/register')

    return (
        <div className='flex flex-col justify-center items-center content-center h-screen w-screen'>
            <div name='logo' className='w-fit'>
                <img src={LOGO} alt='logo' style={{
                    width: '264px',
                    height: '264px'
                }} />
            </div>
            <div name='form' className='mt-12 w-10/12 max-w-md'>
                <TextField label='Usuário' placeholder='usuario' onChange={onChangeUserName} fullWidth />
                <PasswordInput label='Senha' placeholder='********' className='mt-4' onChange={onChangePassword} />
            </div>
            <div name='action-buttons' className='mt-6 w-10/12 max-w-md flex flex-wrap md:grid md:grid-cols-2 justify-between'>
                <div className='pb-1 md:pr-1 md:pb-0 w-full'>
                    <ButtonPrimary variant='contained' size='large' className='w-full'>ENTRAR</ButtonPrimary>
                </div>
                <div className='pt-1 md:pl-1 md:pt-0 w-full'>
                    <ButtonSecondary variant='outlined' size='large' className='w-full' onClick={redirectToRegisterPage}>CRIAR CONTA</ButtonSecondary>
                </div>
                <ButtonText variant='text' size='small' className='w-fit'>ESQUECEU SUA SENHA?</ButtonText>
            </div>
        </div>
    )
}