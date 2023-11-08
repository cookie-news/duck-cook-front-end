'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

//Material UI
import {
    TextField,
    Button,
    FormLabel,
    Avatar,
    IconButton
} from "@mui/material";

//Custom Components
import Loading from '@components/Loading';
import ToastCMP from '@components/Toast';
import InputDropzone from '@components/form/InputDropzone';
import Card from '@components/Card';

//Form
import { useForm } from "react-hook-form";

//Types
import { ToastType } from "@/types/ToastType";
import { UserForm } from "@forms/user/UserForm";

//Styels
import './styles.css'

//Types
import UserType from "@/types/UserType";

const EditUserPage = () => {
    // routers
    const router = useRouter();

    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [load, setLoad] = useState(false);

    const [toast, setToast] = useState<ToastType>({
        open: false,
        type: "info",
        message: "",
    } as ToastType);

    const [user, setUser] = useState<UserType>({
        fullName: 'Luidy Moura',
        userName: 'luidymg',
        email: 'luidy.mourawm@gmail.com'
    } as UserType);

    const handlChangeAvatarImg = (event:any) => {
        console.log(event.target.files);

        var reader = new FileReader();

        reader.onload = function (e) {
            let newUser = {...user};
            newUser.avatar = e?.target?.result as string;
            
            setUser(newUser);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <>
            <Card title="Editar Usuário">
                <form>
                    <div className="flex flex-row flex-wrap md:grid md:grid-cols-2 gap-2">
                        <div className="w-full flex justify-center">
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                style={{display: 'none'}}
                                type="file"
                                onChange={handlChangeAvatarImg}
                            />
                             <IconButton>
                                <label htmlFor="contained-button-file" className="label-avatar-file-input">
                                        <Avatar 
                                            sx={{ width: 200, height: 200 }}
                                            src={user.avatar}
                                        />
                                </label>
                            </IconButton>
                        </div>
                        <div className="w-full">
                            {UserForm.map((form) => (
                                <TextField
                                    key={crypto.randomUUID()}
                                    label={form.label}
                                    placeholder={form.placeholder}
                                    className={form.className}
                                    type={form.type}
                                    error={errors && !!errors[form.name as string]}
                                    helperText={errors && errors[form.name as string]?.message as string}
                                    fullWidth
                                    defaultValue={user[form.name as keyof UserType]}
                                    {...register(form.name as string, form.validates)}
                                    onChange={() => {}}
                                />
                            ))}
                        </div>
                    </div>
                </form>
                <>
                    <div className="w-full">
                        <Button
                            variant="contained"
                            size="large"
                            className="w-full"
                        >
                            SALVAR
                        </Button>
                    </div>
                    <div className="w-full">
                        <Button
                            variant="outlined"
                            size="large"
                            className="w-full"
                        >
                            CANCELAR
                        </Button>
                    </div>
                </>
            </Card>

            <Loading load={load} />
            <ToastCMP toast={toast} />
        </>
    );
};

export default EditUserPage;
