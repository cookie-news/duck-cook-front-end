'use client'

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

//Material UI
import {
    TextField,
    Button,
    Avatar,
    IconButton
} from "@mui/material";

//Custom Components
import Loading from '@components/Loading';
import ToastCMP from '@components/Toast';
import Card from '@components/Card';

//Form
import { useForm } from "react-hook-form";

//Types
import { ToastType } from "@/types/ToastType";
import { UserForm } from "@forms/user/UserForm";

//Styels
import './styles.css'

//Contexts
import { AuthContext } from "@context/AuthContext";

//Data Services
import { User } from "@root/src/data/user.service";

//Routes
import { rootRoutes } from "@root/routes";

const EditUserPage = () => {
    // routers
    const router = useRouter();

    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();

    //User
    const { userData } = useContext(AuthContext);

    const [load, setLoad] = useState(false);

    const [toast, setToast] = useState<ToastType>({
        open: false,
        type: "info",
        message: "",
    } as ToastType);

    const [user, setUser] = useState<User>(userData);

    const handleChangeAvatarImg = (event:any) => {
        console.log(event.target.files);

        var reader = new FileReader();

        reader.onload = function (e) {
            let newUser = {...user};
            newUser.image = e?.target?.result as string;
            
            setUser(newUser);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    const updateUser = async (data: any) => {

        console.log(data)

    }

    const redirectToViewUserPage = () => router.push(rootRoutes.user.view.path);

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
                                className="hidden"
                                type="file"
                                onChange={handleChangeAvatarImg}
                            />
                             <IconButton>
                                <label htmlFor="contained-button-file" className="label-avatar-file-input">
                                        <Avatar 
                                            sx={{ width: 200, height: 200 }}
                                            src={user.image}
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
                                    defaultValue={user[form.name as keyof User]}
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
                            onClick={handleSubmit(updateUser)}
                        >
                            SALVAR
                        </Button>
                    </div>
                    <div className="w-full">
                        <Button
                            variant="outlined"
                            size="large"
                            className="w-full"
                            onClick={redirectToViewUserPage}
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
