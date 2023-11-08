'use client'

import { NextPage } from "next";
import { useState } from "react";

//Material UI
import Carousel from 'react-material-ui-carousel'

//Custom
import { Button, Paper, Typography, Container, Alert, IconButton, TextField, Avatar, CardContent, Box, Card, CardMedia } from "@mui/material";
import { Quiz as QuizIcon, ThumbUpOffAlt as ThumbUpOffAltIcon, Edit as EditIcon, Forum as ForumIcon, Key as KeyIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ErrorMessages from "@utils/ErrorMessages";

//Types
import RecipeType from "@/types/RecipeType";

const ViewRecipePage: NextPage = () => {
    const [user, setUser] = useState({
        id: 'test',
        fullName: 'Luidy Moura',
        userName: 'luidymg',
        email: 'luidy.mourawm@gmail.com',
        avatar: 'https://imgs.search.brave.com/VtUkZ_UfRNwFfcSEtdUTd-7tIBHE7FiIJdKsX0Vjirg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvM2Qt/aWxsdXN0cmF0aW9u/LWh1bWFuLWF2YXRh/ci1wcm9maWxlXzIz/LTIxNTA2NzExNDIu/anBnP3NpemU9NjI2/JmV4dD1qcGc'
    });

    const [fiveRecentsUserRecipes, setFiveRecetsUserRecipes] = useState([]);

    const [userRecipeLiked, setUserRecipeLiked] = useState([{
        title: 'Receita 1',
        createdDate: '07/11/2023 02:25',
        images: [{
            src: 'https://imgs.search.brave.com/09u0egwEI5oo55tfE80XFTtFQlEX7GhbFl18TXkyGfo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbGFz/c2ljLmV4YW1lLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wNS9SZW1hbnNv/LWRvLVBlaXhlLmpw/Zz9xdWFsaXR5PTcw/JnN0cmlwPWluZm8m/dz0xMDI0'
        }],
        commentsNumber: 10,
        likeNumber: 5
    }]);

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    return (
        <Container className="mt-10 mb-10">
            <div className="flex pb-4 flex-col md:flex-row items-center	md:items-center" style={{ borderBottom: '1px solid #494949' }}>
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={user.avatar}
                    className="mr-0 md:mr-8"
                />
                <Typography color="text.primary" variant="h3">
                    <b>{user.fullName}</b>
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
                            {user.fullName}
                        </Typography>
                        <Typography color="text.primary" variant="body1" className="mt-2">
                            <b>Nome de Usuário:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body2">
                            {user.userName}
                        </Typography>
                        <Typography color="text.primary" variant="body1" className="mt-2">
                            <b>Email:</b>
                        </Typography>
                        <Typography color="text.primary" variant="body2">
                            {user.email}
                        </Typography>
                    </div>
                    <div className="flex justify-center md:justify-end flex-col md:flex-row h-9 gap-2 mt-4 mb-4 md:mt-0 md:mb-0">
                        <Button variant="outlined" className="flex-1 md:flex-none" startIcon={<KeyIcon />}>
                            Alterar senha
                        </Button>
                        <Button variant="contained" className="flex-1 md:flex-none" endIcon={<EditIcon />}>
                            Editar dados
                        </Button>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                    <div className="mt-4">
                        <Typography color="text.primary" variant="h5">
                            <b>Receitas criadas pelo usuário:</b>
                        </Typography>
                        {
                            fiveRecentsUserRecipes.length == 0
                                ?
                                <Alert variant="outlined" severity="info" className="mt-4" color="info" icon={<QuizIcon />}>
                                    <b>Nenhuma receita encontrada.</b>
                                </Alert>
                                :
                                <div>
                                    {
                                        fiveRecentsUserRecipes.map((recipe: RecipeType, index) =>
                                            <Paper elevation={0} key={crypto.randomUUID()} className={'flex justify-between border border-solid rounded border-neutral-200 border-primary ' + (index > 0 ? 'mt-2' : '')}>
                                                <div className="flex flex-col p-4">
                                                    <Typography component="div" variant="body1">
                                                        <b>{recipe.title}</b>
                                                    </Typography>
                                                    <Typography style={{ color: '#9d9d9d' }} variant="caption">
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
                                                    recipe.images && recipe.images.length > 0
                                                        ?
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 80 }}
                                                            image={recipe.images[0].src}
                                                            style={{ borderRadius: '0px 1px 1px 0px' }}
                                                        />
                                                        :
                                                        <div className="bg-primary" style={{ borderRadius: '0px 1px 1px 0px', width: '80px' }}></div>
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
                                            <Paper elevation={0} key={crypto.randomUUID()} className={'flex justify-between border border-solid rounded border-neutral-200 ' + (index > 0 ? 'mt-2' : '')}>
                                                <div className="flex flex-col p-4">
                                                    <Typography component="div" variant="body1">
                                                        <b>{recipe.title}</b>
                                                    </Typography>
                                                </div>
                                                {
                                                    recipe.images && recipe.images.length > 0
                                                        ?
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 80 }}
                                                            image={recipe.images[0].src}
                                                            style={{ borderRadius: '0px 1px 1px 0px' }}
                                                        />
                                                        :
                                                        <div className="bg-primary" style={{ borderRadius: '0px 1px 1px 0px', width: '80px' }}></div>
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
