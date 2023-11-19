"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//Material UI
import Carousel from "react-material-ui-carousel";

import {
  AccessAlarm as AccessAlarmIcon,
  AddComment as AddCommentIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
} from "@mui/icons-material";
//Custom
import {
  Alert,
  Avatar,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

//Data service
import { RecipeService } from "@root/src/data/recipe.service";
import { UserService } from "@root/src/data/user.service";

//Contexts
import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import ErrorMessages from "@utils/ErrorMessages";

//Styles
import "./style.css";
//Types
import RecipeType from "@/types/RecipeType";

const ViewRecipePage = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<RecipeType>({});

  //Loading
  const { toggle: handleLoadingDialog } = useContext(LoadingContext);

  //User
  const { userData, isLogged } = useContext(AuthContext);

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

    if (newRecipe.commentsNumber) {
      newRecipe.commentsNumber++;
    } else {
      newRecipe.commentsNumber = 1;
    }

    newRecipe.comments?.unshift({
      text: values.comment,
      author: userData,
      createdDatetime:
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString().substring(0, 5),
    });

    setRecipe(newRecipe);

    reset({
      comment: "",
    });
  };

  const getRecipeData = async () => {
    RecipeService.getRecipe(params?.recipeId).then((recipeData: any) => {
      console.log(recipeData);
      recipeData["imagesSRC"] = recipeData.images;
      delete recipeData.images;

      UserService.getUserData("_id", recipeData.idUser)
        .then((authorData: any) => {
          authorData["fullName"] = authorData.name;
          delete authorData.name;

          recipeData.author = authorData;
          console.log(recipeData);

          setRecipe(recipeData);
        })
        .finally(() => {
          handleLoadingDialog();
        });
    });
  };

  useEffect(() => {
    handleLoadingDialog();
    getRecipeData();
  }, []);

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
            {recipe.imagesSRC?.map((image) => (
              <div
                key={crypto.randomUUID()}
                className="bg-cover bg-center h-full bg-no-repeat carousel-image"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </Carousel>
          <div className="p-5 pb-0 md:p-0">
            <Typography color="text.primary" className="font-bold" variant="h4">
              {recipe.title}
            </Typography>
            <Typography
              className="float-right font-bold"
              color="text-primary"
              variant="caption"
            >
              Autor: {recipe.author?.fullName}
            </Typography>
            <div className="flex items-center">
              <IconButton
                aria-label="like"
                color={isLiked ? "primary" : "default"}
                className="mr-2 p-0"
                onClick={isLiked ? onNotLikeRecipe : onLikeRecipe}
              >
                {isLiked ? (
                  <ThumbUpAltIcon fontSize="small" />
                ) : (
                  <ThumbUpOffAltIcon fontSize="small" />
                )}
              </IconButton>
              <Typography
                color="text.primary"
                className="font-bold"
                variant="caption"
              >
                {recipe.likeNumber} curtidas
                <Typography
                  color="CaptionText"
                  className="ml-2 mr-2"
                  variant="caption"
                >
                  |
                </Typography>
                {recipe.commentsNumber} comentários
              </Typography>
            </div>
            <Alert
              variant="outlined"
              severity="info"
              className="mt-4 flex items-center justify-center"
              color="info"
              icon={<AccessAlarmIcon />}
            >
              <b>Tempo de preparo</b>&nbsp;&nbsp;
              {recipe.preparationTimeConverted}
            </Alert>
            <div className="mt-4">
              <Typography color="text.primary" variant="body1">
                <b>Ingredientes usados na receita</b>
              </Typography>
              <div className="mt-2 border-solid border border-neutral-200 rounded-md bg-neutral-50 grid grid-cols-1">
                {recipe.ingredients?.map((ingredient: any) => (
                  <div
                    key={crypto.randomUUID()}
                    className="p-4 border-b border-t-0 border-r-0 border-l-0 border-solid border-green-50dark"
                  >
                    <Typography color="text.primary" variant="body1">
                      {ingredient.quantity} {ingredient.measure} de{" "}
                      {ingredient.name}.
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 p-5 pt-0 md:p-0">
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
            {recipe.preparationMethod}
          </Typography>
        </div>
        <form className="p-5 pt-0 md:p-0">
          <div className="mt-4">
            <Typography color="text.primary" variant="body1">
              <b>Comentários</b>
            </Typography>
            {isLogged && (
              <div className="mt-2 flex flex-col md:flex-row">
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  src={userData.image}
                  className="md:mr-2 hidden md:block"
                />
                <TextField
                  placeholder="Adicione seu comentário aqui..."
                  type="text"
                  error={errors && !!errors["comment"]}
                  helperText={errors && (errors["comment"]?.message as string)}
                  fullWidth
                  multiline
                  rows={3}
                  {...register("comment", { required: ErrorMessages.REQUIRED })}
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
              className="w-full md:w-auto"
            >
              ENVIAR COMENTÁRIO
            </Button>
          </div>
          <div className="mt-4">
            {recipe.comments?.map((comment) => (
              <div
                className={
                  "flex w-full mt-4 " +
                  (isLogged && comment.author.id == userData.id
                    ? "flex-row-reverse"
                    : "")
                }
                key={crypto.randomUUID()}
              >
                <div className="mr-2 w-5 h-5 md:w-11 md:h-11"></div>
                <div className="flex-1 mr-2 p-4 border border-solid rounded-md border-neutral-200 bg-neutral-50 text-left">
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    src={comment.author.image}
                    className="flex-none md:hidden float-right"
                  />
                  <Typography variant="body2">
                    <b>{comment.author.name}:</b>
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
                  src={comment.author.name}
                  className="flex-none mr-2 hidden md:block"
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
