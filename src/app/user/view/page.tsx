'use client'

import { useContext,useState } from "react";
import { useForm } from "react-hook-form";

import { NextPage } from "next";
import { useRouter } from "next/navigation";

import { Edit as EditIcon, Forum as ForumIcon, Key as KeyIcon,Quiz as QuizIcon, ThumbUpOffAlt as ThumbUpOffAltIcon } from "@mui/icons-material";
//Custom
import { Alert, Avatar, Button, CardMedia,Container, Paper, Typography } from "@mui/material";

//Routes
import { rootRoutes } from "@root/routes";

//Contexts
import { AuthContext } from "@context/AuthContext";

//Types
import RecipeType from "@/types/RecipeType";


const ViewRecipePage: NextPage = () => {
    const router = useRouter();

    //User
    const { userData } = useContext(AuthContext);

    const [fiveRecentsUserRecipes, setFiveRecetsUserRecipes] = useState([]);

    const [userRecipeLiked, setUserRecipeLiked] = useState<RecipeType[]>([]);

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const redirectToEditUserPage = () => router.push(rootRoutes.user.edit.path);

    return (
        <Container className="mt-10 mb-10">
            <div className="flex pb-4 flex-col md:flex-row items-center	md:items-center border-b border-t-0 border-r-0 border-l-0 border-solid border-gray-default">
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={userData.image}
                    className="mr-0 md:mr-8"
                />
                <Typography color="text.primary" variant="h3">
                    <b>{userData.name}</b>
                </Typography>
            </div>
            <div className="p-0 pt-4 md:p-4">
                <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                    <div>
                        <Typography color="text.primary" variant="h5">
                            <b>Informações do Usuário:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body1" className="mt-2">
                            <b>Nome de Completo:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body2">
                            {userData.name}
                        </Typography>
                        <Typography color="text.primary" variant="body1" className="mt-2">
                            <b>Nome de Usuário:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body2">
                            {userData.user}
                        </Typography>
                        <Typography color="text.primary" variant="body1" className="mt-2">
                            <b>Email:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body2">
                            {userData.email}
                        </Typography>
                    </div>
                    <div className="flex justify-center md:justify-end flex-col md:flex-row h-9 gap-2 mt-4 mb-4 md:mt-0 md:mb-0">
                        <Button variant="outlined" className="flex-1 md:flex-none" startIcon={<KeyIcon />}>
                            Alterar senha
                        </Button>
                        <Button variant="contained" className="flex-1 md:flex-none" onClick={redirectToEditUserPage} endIcon={<EditIcon />}>
                            Editar dados
                        </Button>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                    <div className="mt-4">
                        <Typography color="text.primary" variant="h5" className="mb-2">
                            <b>Receitas criadas pelo usuário:</b>
                        </Typography>
                        {
                            fiveRecentsUserRecipes.length == 0
                                ?
                                <Alert variant="outlined" severity="info" color="info" icon={<QuizIcon />}>
                                    <b>Nenhuma receita encontrada.</b>
                                </Alert>
                                :
                                <div>
                                    {
                                        fiveRecentsUserRecipes.map((recipe: RecipeType, index) =>
                                            <Paper elevation={0} key={crypto.randomUUID()} className={'flex justify-between border border-solid rounded border-neutral-200 border-primary overflow-auto ' + (index > 0 ? 'mt-2' : '')}>
                                                <div className="flex flex-col p-4">
                                                    <Typography component="div" variant="body1">
                                                        <b>{recipe.title}</b>
                                                    </Typography>
                                                    <Typography color="CaptionText" variant="caption">
                                                        {recipe.createdDatetime}
                                                    </Typography>
                                                    <div className="flex items-center mt-2">
                                                        <div className="flex mr-2">
                                                            <ForumIcon className="mr-1" />
                                                            <Typography variant="body1">
                                                                <b>{recipe.commentsNumber}</b>
                                                            </Typography>
                                                        </div>
                                                        <div className="flex">
                                                            <ThumbUpOffAltIcon className="mr-1" />
                                                            <Typography variant="body1">
                                                                <b>{recipe.likeNumber}</b>
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    recipe.imagesSRC && recipe.imagesSRC.length > 0
                                                        ?
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 80 }}
                                                            image={recipe.imagesSRC[index]}
                                                            style={{ borderRadius: '0px 1px 1px 0px' }}
                                                        />
                                                        :
                                                        <div className="bg-primary"></div>
                                                }
                                            </Paper>
                                        )
                                    }
                                </div>
                        }
                    </div>
                    <div className="mt-4 flex flex-col">
                        <Typography color="text.primary" variant="h5" className="mb-2">
                            <b>Receitas curtidas:</b>
                        </Typography>
                        {
                            userRecipeLiked.length == 0
                                ?
                                <Alert variant="outlined" severity="info" color="info" icon={<QuizIcon />}>
                                    <b>Nenhuma receita encontrada.</b>
                                </Alert>
                                :
                                <div>
                                    {
                                        userRecipeLiked.map((recipe, index) =>
                                            <Paper elevation={0} key={crypto.randomUUID()} className={'flex justify-between border border-solid rounded border-neutral-200 overflow-auto ' + (index > 0 ? 'mt-2' : '')}>
                                                <div className="flex flex-col p-4">
                                                    <Typography component="div" variant="body1">
                                                        <b>{recipe.title}</b>
                                                    </Typography>
                                                </div>
                                                {
                                                    recipe.imagesSRC && recipe.imagesSRC.length > 0
                                                        ?
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 80 }}
                                                            image={recipe.imagesSRC[0]}
                                                            style={{ borderRadius: '0px 1px 1px 0px' }}
                                                        />
                                                        :
                                                        <div className="bg-primary" ></div>
                                                }
                                            </Paper>
                                        )
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ViewRecipePage;
