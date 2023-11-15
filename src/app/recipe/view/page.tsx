'use client'

import { NextPage } from "next";
import { useState } from "react";

//Next
import Image from "next/image";

//Material UI
import Carousel from 'react-material-ui-carousel'

//Custom
import { Button, Paper, Typography, Container, Alert, IconButton, TextField, Avatar } from "@mui/material";
import { AccessAlarm as AccessAlarmIcon, ThumbUpOffAlt as ThumbUpOffAltIcon, ThumbUpAlt as ThumbUpAltIcon, AddComment as AddCommentIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ErrorMessages from "@utils/ErrorMessages";

//Types
import UserType from "@/types/UserType";
import RecipeType from "@/types/RecipeType";

//Styles
import './style.css'

const ViewRecipePage: NextPage = () => {

    const [recipe, setRecipe] = useState<RecipeType>({
        title: 'Teste',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu.`,
        methodPreparation: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu.`,
        imagesSRC: [
            'https://imgs.search.brave.com/oJSPuQZwtRfqQAPZKbhN46gD54yT5oaahiMFUiuDgFo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/MTQ3OTAzL3B0L2Zv/dG8vZGlldGEtYWJz/dXJkbHktcGVxdWVu/YS1yZWZlaSVDMyVB/NyVDMyVBM28uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTRf/b1RSMGp2MlgwWjhf/QU4waUVvNi1zMFNT/dURFTjdjbzBCaS1r/cW04Nk09',
            'https://imgs.search.brave.com/09u0egwEI5oo55tfE80XFTtFQlEX7GhbFl18TXkyGfo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbGFz/c2ljLmV4YW1lLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wNS9SZW1hbnNv/LWRvLVBlaXhlLmpw/Zz9xdWFsaXR5PTcw/JnN0cmlwPWluZm8m/dz0xMDI0'],
        ingredients: [{
            name: 'Açucar',
            quantity: '1',
            measure: 'Colher(es)'
        },{
            name: 'Leite',
            quantity: '1',
            measure: 'L'
        },{
            name: 'Chocolate em pó',
            quantity: '1',
            measure: 'Xícara(s)'
        },{
            name: 'Manteiga',
            quantity: '3',
            measure: 'Colher(es)'
        },
        {
            name: 'Açucar',
            quantity: '1',
            measure: 'Colher(es)'
        },{
            name: 'Leite',
            quantity: '1',
            measure: 'L'
        },{
            name: 'Chocolate em pó',
            quantity: '1',
            measure: 'Xícara(s)'
        },{
            name: 'Manteiga',
            quantity: '3',
            measure: 'Colher(es)'
        }],
        author: {
            fullName: 'Luidy Moura'
        } as UserType,
        preparetionTime: '01:30',
        likeNumber: 10,
        commentsNumber: 100,
        comments: [{
            author: {
                fullName: 'Lucas Nascimento',
                avatar: 'https://imgs.search.brave.com/xIDwytv2xutDq2oHeLEkZwVL_q8jDk2cqgdeZhNDXWI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wdWIt/c3RhdGljLmZvdG9y/LmNvbS9hc3NldHMv/cHJvamVjdHMvcGFn/ZXMvNGIyZmNkN2Vi/NjhhNDdjNjk4ZmQ3/YWMzNTI4YzU2YTEv/Zm90b3ItZmJjNjc4/MGUyNTA2NDY5ZGE2/N2FiYjUxNWMxN2Uw/ZTYuanBn'
            } as UserType,
            text: `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.`,
            createdDatetime: '06/11/2023 20:01'
        },
        {
            author: {
                id: 'test',
                fullName: 'Luidy Moura',
                avatar: 'https://imgs.search.brave.com/VtUkZ_UfRNwFfcSEtdUTd-7tIBHE7FiIJdKsX0Vjirg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvM2Qt/aWxsdXN0cmF0aW9u/LWh1bWFuLWF2YXRh/ci1wcm9maWxlXzIz/LTIxNTA2NzExNDIu/anBnP3NpemU9NjI2/JmV4dD1qcGc'
            } as UserType,
            text: 'Muito bom!!',
            createdDatetime: '05/11/2023 22:58'
        },{
            author: {
                fullName: 'Paulo Iury',
                avatar: 'https://imgs.search.brave.com/qDwk5XMurETJUyZmI31i5PLVCimIotCqjpSbGaM_HVE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWVpa2VyLmlvL2Fz/c2V0cy81MDM3LzIw/MTkvMTIvaWNvbl8y/MDE5MTIxOTA3MTYx/NTVkZmIyM2JmYWE2/ZWIucG5n'
            } as UserType,
            text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
            createdDatetime: '05/11/2023 15:25'
        }]
    } as RecipeType);
    
    const [user, setUser] = useState<UserType>({
        id: 'test',
        fullName: 'Luidy Moura',
        avatar: 'https://imgs.search.brave.com/VtUkZ_UfRNwFfcSEtdUTd-7tIBHE7FiIJdKsX0Vjirg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvM2Qt/aWxsdXN0cmF0aW9u/LWh1bWFuLWF2YXRh/ci1wcm9maWxlXzIz/LTIxNTA2NzExNDIu/anBnP3NpemU9NjI2/JmV4dD1qcGc'
    } as UserType);

    const [isLiked, setIsLiked] = useState(false);
    
    // react hook form
    const { register, handleSubmit, formState: { errors }, reset} = useForm();

    const onLikeRecipe = () => {
        let newRecipe = {...recipe};
        if(!newRecipe.likeNumber) { newRecipe.likeNumber = 0; }
        
        newRecipe.likeNumber += 1;
        setRecipe(newRecipe);
        setIsLiked(true);
    }

    const onNotLikeRecipe = () => {
        let newRecipe = {...recipe};
        if(!newRecipe.likeNumber) { newRecipe.likeNumber = 0; }
        
        newRecipe.likeNumber -= 1;
        setRecipe(newRecipe);
        setIsLiked(false);
    }

    const onCreateComment = (values:any) => {
        let newRecipe = {...recipe};

        if(newRecipe.commentsNumber) { newRecipe.commentsNumber++; }
        else { newRecipe.commentsNumber = 1; }

        newRecipe.comments?.unshift({
            text: values.comment,
            author: user,
            createdDatetime: (new Date()).toLocaleDateString()+' '+(new Date()).toLocaleTimeString().substring(0, 5)
        })

        setRecipe(newRecipe);

        reset({
            comment: ''
        })
    }

    return (
        <Container className="mt-10 mb-10">
            <div className="p-0 md:p-10 bg-white rounded-md overflow-auto">
                <div className="md:grid md:grid-cols-2 md:grid-rows-none gap-2 md:gap-8">
                    <Carousel 
                        className="w-full h-96 md:h-full md:rounded-md"
                        fullHeightHover={false}
                        autoPlay={true}
                        indicators={false}
                    >
                        {
                            recipe.imagesSRC?.map((image) => 
                                <div key={crypto.randomUUID()} className="bg-cover bg-center h-full bg-no-repeat carousel-image" style={{backgroundImage: `url(${image})`}}></div>
                            )
                        }
                    </Carousel>
                    <div className="p-5 pb-0 md:p-0">
                        <Typography color="text.primary" className="font-bold" variant="h4">
                            {recipe.title}
                        </Typography>
                        <Typography className="float-right font-bold" color="text-primary" variant="caption">
                            Autor: {recipe.author?.fullName}
                        </Typography>
                        <div className="flex items-center">
                            <IconButton aria-label="like" color={isLiked ? 'primary' : 'default'}  className="mr-2 p-0" onClick={isLiked ? onNotLikeRecipe : onLikeRecipe}>
                                {isLiked ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpOffAltIcon fontSize="small" />}
                            </IconButton>
                            <Typography color="text.primary" className="font-bold" variant="caption">
                                {recipe.likeNumber} curtidas
                                <Typography color="CaptionText" className="ml-2 mr-2" variant="caption">|</Typography>
                                {recipe.commentsNumber} comentários
                            </Typography>
                        </div>
                        <Alert variant="outlined" severity="info" className="mt-4 flex items-center justify-center" color="info" icon={<AccessAlarmIcon />}>
                            <b>Tempo de preparo</b>&nbsp;&nbsp;{recipe.preparetionTime}
                        </Alert>
                        <div className="mt-4">
                            <Typography color="text.primary" variant="body1">
                                <b>Ingredientes usados na receita</b>
                            </Typography>
                            <div className="mt-2 border-solid border border-neutral-200 rounded-md bg-neutral-50 grid grid-cols-1">
                                {
                                    recipe.ingredients?.map((ingredient:any) => 
                                        <div key={crypto.randomUUID()} className="p-4 border-b border-t-0 border-r-0 border-l-0 border-solid border-green-50dark">
                                            <Typography color="text.primary" variant="body1">
                                                {ingredient.quantity} {ingredient.measure} de {ingredient.name}.
                                            </Typography>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 p-5 pt-0 md:p-0">
                    <Typography color="text.primary" variant="body1">
                        <b>Descrição</b>
                    </Typography>
                    <Typography color="text.primary" variant="body2">
                        {recipe.description}
                    </Typography>
                    <Typography className="mt-4" color="text.primary" variant="body1">
                        <b>Modo de preparo</b>
                    </Typography>
                    <Typography color="text.primary" variant="body2">
                        {recipe.methodPreparation}
                    </Typography>
                </div>
                <form className="p-5 pt-0 md:p-0">
                    <div className="mt-4">
                        <Typography color="text.primary" variant="body1">
                            <b>Comentários</b>
                        </Typography>
                        {
                            user &&
                            <div className="mt-2 flex flex-col md:flex-row">
                                <Avatar 
                                    sx={{ width: 50, height: 50 }}
                                    src={user.avatar}
                                    className="md:mr-2 hidden md:block"
                                />
                                <TextField
                                    placeholder="Adicione seu comentário aqui..."
                                    type="text"
                                    error={errors && !!errors['comment']}
                                    helperText={errors && errors['comment']?.message as string}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    {...register('comment', {required: ErrorMessages.REQUIRED})}
                                    onChange={() => {}}
                                />
                            </div>
                        }
                    </div>
                    <div className="mt-2 flex justify-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(onCreateComment)}
                            startIcon={<AddCommentIcon />}
                            className="w-full md:w-auto"
                        >
                            ENVIAR COMENTÁRIO
                        </Button>
                    </div>
                    <div className="mt-4">
                        {
                            recipe.comments?.map((comment) => 
                                <div className={'flex w-full mt-4 '+(comment.author.id == user.id ? 'flex-row-reverse' : '')} key={crypto.randomUUID()}>
                                    <div className="mr-2 w-5 h-5 md:w-11 md:h-11"></div>
                                    <div className="flex-1 mr-2 p-4 border border-solid rounded-md border-neutral-200 bg-neutral-50 text-left">
                                        <Avatar 
                                            sx={{ width: 30, height: 30 }}
                                            src={comment.author.avatar}
                                            className="flex-none md:hidden float-right"
                                        />
                                        <Typography variant="body2">
                                            <b>{comment.author.fullName}:</b>
                                        </Typography>
                                        <Typography variant="body2" className="mt-1">
                                            {comment.text}
                                        </Typography>
                                        <div className="text-right mt-2">
                                            <Typography color="CaptionText" variant="caption">
                                                {comment.createdDatetime}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Avatar 
                                        sx={{ width: 45, height: 45 }}
                                        src={comment.author.avatar}
                                        className="flex-none mr-2 hidden md:block"
                                    />
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ViewRecipePage;