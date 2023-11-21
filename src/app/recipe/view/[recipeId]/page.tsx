import Carousel from "react-material-ui-carousel";

import PageWrapper from "@components/PageWrapper";

import CarouselImages from "../_components/CarouselImages";
import CommentsSection from "../_components/CommentsSection";
import RateSection from "../_components/RateSection";

const ViewRecipePage = ({ params }: { params: { recipeId: string } }) => {
  // const [recipe, setRecipe] = useState<RecipeType>({});

  // //Loading
  // const { toggle: handleLoadingDialog } = useContext(LoadingContext);

  // //User
  // const { userData, isLogged } = useContext(AuthContext);

  // const [isLiked, setIsLiked] = useState(false);

  // // react hook form
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // const [toast, setToast] = useState({
  //   open: false,
  //   type: "info",
  //   message: "",
  // });

  // const onLikeRecipe = () => {
  //   let newRecipe = { ...recipe };

  //   handleLoadingDialog();

  //   const newLike = {
  //     idRecipe: params?.recipeId,
  //     idUser: userData.id,
  //   };

  //   RecipeService.createRecipeLike(newLike)
  //     .then((data) => {
  //       if (!newRecipe.likeNumber) {
  //         newRecipe.likeNumber = 0;
  //       }

  //       newRecipe.likeNumber += 1;
  //       setRecipe(newRecipe);
  //       setIsLiked(true);
  //     })
  //     .finally(() => {
  //       handleLoadingDialog();
  //     })
  //     .catch((error) => {
  //       setToast({
  //         open: true,
  //         type: "error",
  //         message: error.message,
  //       });
  //     });
  // };

  // const onNotLikeRecipe = () => {
  //   let newRecipe = { ...recipe };

  //   handleLoadingDialog();

  //   const deleteLike = {
  //     idRecipe: params?.recipeId,
  //     idUser: userData.id,
  //   };

  //   RecipeService.deleteRecipeLike(deleteLike)
  //     .then((data) => {
  //       if (!newRecipe.likeNumber) {
  //         newRecipe.likeNumber = 0;
  //       }

  //       newRecipe.likeNumber -= 1;
  //       setRecipe(newRecipe);
  //       setIsLiked(false);
  //     })
  //     .finally(() => {
  //       handleLoadingDialog();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setToast({
  //         open: true,
  //         type: "error",
  //         message: error.message,
  //       });
  //     });
  // };

  // const onCreateComment = async (values: any) => {
  //   if (values.comment.replaceAll(" ", "") == "") return;

  //   handleLoadingDialog();

  //   const newComment = {
  //     idRecipe: params?.recipeId,
  //     idUser: userData.id,
  //     message: values.comment,
  //   };

  //   await RecipeService.createRecipeComment(newComment)
  //     .then((data) => {
  //       let newRecipe = { ...recipe };

  //       console.log(newRecipe);

  //       if (newRecipe.commentsNumber) {
  //         newRecipe.commentsNumber++;
  //       } else {
  //         newRecipe.commentsNumber = 1;
  //         newRecipe.comments = [];
  //       }

  //       newRecipe.comments?.unshift({
  //         text: values.comment,
  //         author: userData,
  //         createdDatetime:
  //           new Date().toLocaleDateString() +
  //           " " +
  //           new Date().toLocaleTimeString().substring(0, 5),
  //       });

  //       setRecipe(newRecipe);

  //       reset({
  //         comment: "",
  //       });
  //     })
  //     .finally(() => {
  //       handleLoadingDialog();
  //     })
  //     .catch((error) => {
  //       setToast({
  //         open: true,
  //         type: "error",
  //         message: error.message,
  //       });
  //     });
  // };

  // const getRecipeData = async () => {
  //   try {
  //     await RecipeService.getRecipe(params.recipeId)
  //       .then((recipeData: any) => {
  //         recipeData["imagesSRC"] = recipeData.images;
  //         delete recipeData.images;

  //         UserService.getUserData("_id", recipeData.idUser)
  //           .then((authorData: any) => {
  //             authorData["fullName"] = authorData.name;
  //             delete authorData.name;

  //             recipeData.author = authorData;

  //             RecipeService.getRecipeLikes(params?.recipeId)
  //               .then(async (numberOfLikes) => {
  //                 recipeData.likeNumber = numberOfLikes.count;

  //                 RecipeService.getRecipeComments(params?.recipeId)
  //                   .then(async (commentsOfRecipe: any[]) => {
  //                     if (commentsOfRecipe) {
  //                       recipeData.comments = [];

  //                       commentsOfRecipe.forEach((commentOfRecipe) => {
  //                         const createdAt = new Date(commentOfRecipe.createdAt);

  //                         console.log(authorData);
  //                         recipeData.comments.push({
  //                           id: commentOfRecipe.id,
  //                           text: commentOfRecipe.message,
  //                           createdDatetime:
  //                             createdAt.toLocaleDateString() +
  //                             " " +
  //                             createdAt.toLocaleTimeString(),
  //                           author: commentOfRecipe.user,
  //                         });
  //                       });

  //                       recipeData.commentsNumber = commentsOfRecipe.length;
  //                     } else {
  //                       recipeData.commentsNumber = 0;
  //                     }
  //                   })
  //                   .finally(() => {
  //                     console.log(recipeData);
  //                     setRecipe(recipeData);
  //                     handleLoadingDialog();
  //                   })
  //                   .catch((error) => {
  //                     setToast({
  //                       open: true,
  //                       type: "error",
  //                       message: error.message,
  //                     });
  //                     handleLoadingDialog();
  //                   });
  //               })
  //               .catch((error) => {
  //                 setToast({
  //                   open: true,
  //                   type: "error",
  //                   message: error.message,
  //                 });
  //                 handleLoadingDialog();
  //               });
  //           })
  //           .catch((error) => {
  //             setToast({
  //               open: true,
  //               type: "error",
  //               message: error.message,
  //             });
  //             handleLoadingDialog();
  //           });
  //       })
  //       .catch((error) => {
  //         setToast({
  //           open: true,
  //           type: "error",
  //           message: error.message,
  //         });
  //         handleLoadingDialog();
  //       });
  //   } catch (error: any) {
  //     setToast({
  //       open: true,
  //       type: "error",
  //       message: error.message,
  //     });
  //     handleLoadingDialog();
  //   }
  // };

  // useEffect(() => {
  //   handleLoadingDialog();
  //   getRecipeData();
  // }, []);

  return (
    <>
      <PageWrapper hasMenu>
        <div className="flex gap-8">
          <div className="flex-1">
            <CarouselImages images={[]} />
          </div>
          <div className="flex-1 flex flex-col gap-5 h-96">
            <h1 className="uppercase font-bold text-3xl text-slate-700">
              Bolo de Cenoura com Cobertura de Chocolate
            </h1>
            <RateSection />
            <p className="flex-1 text-slate-700 text-sm font-medium">
              Todo caderno de receita conta com um Bolo de Cenoura com Cobertura
              de Chocolate. Mas aqui você aprende a melhor forma de fazê-lo e
              todas as suas variações, para deixar o seu momento de café da
              tarde mais completo! Com um toque de Maizena, seu bolo vai ficar
              fofinho e delicioso. Siga passo a passo e tire a prova!
            </p>

            <div className="flex gap-2">
              <p className="text-slate-700 text-sm">
                <b>Por:</b> Lucas Nascimento
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-10">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-slate-700 font-bold text-2xl ">Igredientes</h2>
            <p>
              Massa 2 cenouras médias, cortadas em cubos 300 g 1/2 xícara de chá
              de óleo 125 ml 3 ovos 1/2 xícara de chá de Amido de Milho Maizena
              Vita + 60 g maizena Logo 1 1/2 xícara de chá de farinha de trigo
              210 g 2 colheres de chá de fermento em pó 8 g 1 xícara de chá de
              açúcar 190 g Cobertura 1/2 xícara de chocolate ao leite derretido
              1/2 xícara de creme de leite
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-slate-700 font-bold text-2xl ">
              Modo de preparo
            </h2>
            <p>
              1 - Pré-aqueça o forno em temperatura média (180°C). 2 - Unte e
              enfarinhe uma forma de furo central média (20 cm de diâmetro).
              Reserve. 3 - No copo do liquidificador, coloque a cenoura, o óleo
              e os ovos, e bata até a massa do bolo de cenoura ficar homogênea.
              4 - Em uma tigela, peneire o amido de milho MAIZENA®, a farinha de
              trigo, o fermento e o açúcar, junte a mistura de cenoura
              reservada, e mexa com o auxílio de uma espátula até que vire uma
              massa uniforme. 5Disponha a massa na forma reservada e leve ao
              forno por 40 minutos, ou até que um palito, depois de espetado na
              massa, saia limpo. Retire o forno e deixe amornar.
            </p>
          </div>
        </div>
        <CommentsSection />
      </PageWrapper>
      {/* <PageWrapper>
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
                <Typography
                  color="text.primary"
                  className="font-bold"
                  variant="h4"
                >
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
                      helperText={
                        errors && (errors["comment"]?.message as string)
                      }
                      fullWidth
                      multiline
                      rows={3}
                      {...register("comment", {
                        required: "O Campo é obrigatório",
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
                      src={comment.author.image}
                      className="flex-none mr-2 hidden md:block"
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </Container>
      </PageWrapper> */}
    </>
  );
};

export default ViewRecipePage;
