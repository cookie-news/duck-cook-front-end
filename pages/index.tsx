import { useRouter } from 'next/navigation';

export default function Home() 
{
    const { push } = useRouter();

    const redirectToLoginPage = () => push('/login')
    const redirectToRegisterPage = () => push('/register')

    return (
        <div>
            <p>HOME</p>
            <p onClick={redirectToLoginPage}>TELA LOGIN</p>
            <p onClick={redirectToRegisterPage}>TELA CRIAR CONTA</p>
        </div>
    )
}