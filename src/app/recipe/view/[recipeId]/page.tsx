"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

//Material UI
import Carousel from "react-material-ui-carousel";

//Custom
import {
  Button,
  Paper,
  Typography,
  Container,
  Alert,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import {
  AccessAlarm as AccessAlarmIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  AddComment as AddCommentIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ErrorMessages from "@utils/ErrorMessages";

//Types
import UserType from "@/types/UserType";
import RecipeType from "@/types/RecipeType";
import PageWrapper from "@components/PageWrapper";
import { AuthContext } from "@root/src/context/AuthContext";

//Data services
import { getRecipe } from "@root/src/data/recipe.service";

const ViewRecipePage = ({params}:{params:{recipeId:string}}) => {
  const [recipe, setRecipe] = useState<RecipeType>({});
  
  const [user, setUser] = useState<UserType>({
    id: "test",
    fullName: "Luidy Moura",
    avatar:
      "https://imgs.search.brave.com/VtUkZ_UfRNwFfcSEtdUTd-7tIBHE7FiIJdKsX0Vjirg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvM2Qt/aWxsdXN0cmF0aW9u/LWh1bWFuLWF2YXRh/ci1wcm9maWxlXzIz/LTIxNTA2NzExNDIu/anBnP3NpemU9NjI2/JmV4dD1qcGc",
  } as UserType);

  const [isLiked, setIsLiked] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLikeRecipe = () => {
    let newRecipe = { ...recipe };
    if (!newRecipe.likeNumber) {
      newRecipe.likeNumber = 0;
    }

    newRecipe.likeNumber += 1;
    setRecipe(newRecipe);
    setIsLiked(true);
  };

  const onNotLikeRecipe = () => {
    let newRecipe = { ...recipe };
    if (!newRecipe.likeNumber) {
      newRecipe.likeNumber = 0;
    }

    newRecipe.likeNumber -= 1;
    setRecipe(newRecipe);
    setIsLiked(false);
  };

  const onCreateComment = (values: any) => {
    let newRecipe = { ...recipe };

    newRecipe.comments?.unshift({
      text: values.comment,
      author: user,
      createdDatetime:
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString().substring(0, 5),
    });

    reset({
      comment: "",
    });
  };

  const getRecipeData = async () =>{

    getRecipe(params.recipeId).then((data)=>{

      setRecipe({ title: data.title,
                  description: data.description,
                  ingredients: data.ingredients,  
                  preparationTime   : data.preparationTimeConverted,  
                  preparationMethod : data.preparationMethod,
                  images            : data.images


      });

    })

  };
  
  useEffect(()=>{
    getRecipeData();
  },[]);

  return (
      <Container className="mt-10 mb-10">
        <div style={{ borderBottom: "1px solid #494949" }}>
          <Typography color="text.primary" variant="h2">
            <b>{recipe.title}</b>
          </Typography>
          <Typography color="text.primary" variant="subtitle2">
            Autor: {recipe?.author?.fullName}
          </Typography>
        </div>
        <div className="p-0 pt-4 md:p-4">
          <div className="md:grid md:grid-cols-2 gap-2 flex flex-col-reverse md:flex-col">
            <div>
              <Typography color="text.primary" variant="body1">
                <b>Descrição:</b>
              </Typography>
              <Typography color="text.primary" variant="body2">
                {recipe.description}
              </Typography>
              <Alert
                variant="outlined"
                severity="info"
                className="mt-4"
                color="info"
                icon={<AccessAlarmIcon />}
              >
                <b>Tempo de preparo:</b> {recipe.preparationTime}
              </Alert>
              <div className="mt-4">
                <Typography color="text.primary" variant="body1">
                  <b>Ingredientes:</b>
                </Typography>
                <ul>
                  {recipe.ingredients?.map((ingredient: any) => (
                    <li key={crypto.randomUUID()}>
                      <Typography color="text.primary" variant="body2">
                        {ingredient.quantity} {ingredient.measure} de{" "}
                        {ingredient.name}.
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <Carousel
                className="w-full"
                fullHeightHover={false}
                autoPlay={true}
                indicators={false}
              >
                {recipe.images?.map((image) => (
                  <Paper
                    key={crypto.randomUUID()}
                    elevation={0}
                    square
                    className="flex justify-center bg-transparent"
                  >
                    <img style={{ width: "100%" }} src={image} />
                  </Paper>
                ))}
              </Carousel>
              <div className="mt-2 text-left md:text-right">
                <Typography
                  color={isLiked ? "primary" : "text.primary"}
                  variant="body1"
                >
                  <IconButton
                    aria-label="like"
                    color={isLiked ? "primary" : "default"}
                    onClick={isLiked ? onNotLikeRecipe : onLikeRecipe}
                  >
                    {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                  </IconButton>

                  <b>{recipe.likeNumber}</b>
                </Typography>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Typography color="text.primary" variant="body1">
              <b>Modo de preparo:</b>
            </Typography>
            <Typography color="text.primary" variant="body2">
              {recipe.preparationMethod}
            </Typography>
          </div>
          <form>
            <div className="mt-4">
              <Typography color="text.primary" variant="body1">
                <b>Comentários:</b>
              </Typography>
              {user && (
                <div className="mt-2 flex">
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={user.avatar}
                    className="mr-2"
                  />
                  <TextField
                    placeholder="Adicione seu comentário aqui..."
                    type="text"
                    error={errors && !!errors["comment"]}
                    helperText={
                      errors && (errors["comment"]?.message as string)
                    }
                    fullWidth
                    multiline
                    rows={3}
                    {...register("comment", {
                      required: ErrorMessages.REQUIRED,
                    })}
                    onChange={() => {}}
                  />
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onCreateComment)}
                startIcon={<AddCommentIcon />}
              >
                ENVIAR COMENTÁRIO
              </Button>
            </div>
            <div className="mt-4">
              {recipe.comments?.map((comment) => (
                <div
                  className={
                    "flex w-full mt-4 " +
                    (comment.author.id == user.id ? "flex-row-reverse" : "")
                  }
                  key={crypto.randomUUID()}
                >
                  <div
                    className="mr-2"
                    style={{ width: "45px", height: "45px" }}
                  ></div>
                  <Paper
                    elevation={2}
                    className="flex-1 mr-2 p-4 border border-solid rounded border-neutral-100 text-left"
                  >
                    <Typography variant="body2">
                      <b>{comment.author.fullName}:</b>
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      {comment.text}
                    </Typography>
                    <div className="text-right mt-2">
                      <Typography
                        style={{ color: "#9d9d9d" }}
                        variant="caption"
                      >
                        {comment.createdDatetime}
                      </Typography>
                    </div>
                  </Paper>
                  <Avatar
                    sx={{ width: 45, height: 45 }}
                    src={comment.author.avatar}
                    className="flex-none mr-2"
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </Container>
  );
};

export default ViewRecipePage;
