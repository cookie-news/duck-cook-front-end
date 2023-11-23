"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Data service
import { RecipeService } from "@root/src/data/recipe.service";
import { Recipe } from "@root/src/types/Recipe";

//Contexts
import { AuthContext } from "@context/AuthContext";

//Page Components
import ListRecipeSection from "./_components/ListRecipeSection";
import UserHeaderSection from "./_components/UserHeaderSection";
import UserInfoSection from "./_components/UserInfoSection";
import Loading from "./loading";

const ViewUserPage = () => {
  //User
  const { userData, token } = useContext(AuthContext);

  const [userRecipes, setUserRecipes] = useState<Array<Recipe>>([]);
  const [userRecipesLiked, setUserRecipesLiked] = useState<Array<Recipe>>([]);

  const [loadingRecipiesCreatedByUser, setLoadingRecipiesCreatedByUser] =
    useState<boolean>(true);
  const [
    loadingRecipiesLikedByCurrentUser,
    setLoadingRecipiesLikedByCurrentUser,
  ] = useState<boolean>(true);

  const getRecipiesCreatedByCurrentUser = () => {
    RecipeService.getRecipiesByUser(userData.id, token)
      .then((userRecipesData: any) => {
        setUserRecipes(userRecipesData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoadingRecipiesCreatedByUser(false);
      });
  };

  const getRecipiesLikedByCurrentUser = () => {
    RecipeService.getRecipiesLikedByUser(userData.id, token)
      .then((userRecipesData: any) => {
        setUserRecipesLiked(userRecipesData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoadingRecipiesLikedByCurrentUser(false);
      });
  };

  useEffect(() => {
    getRecipiesCreatedByCurrentUser();
    getRecipiesLikedByCurrentUser();
  }, [userData]);

  return loadingRecipiesCreatedByUser || loadingRecipiesLikedByCurrentUser ? (
    <Loading />
  ) : (
    <div className="mt-10 mb-10 text-gray-default">
      <UserHeaderSection userData={userData} />
      <div className="p-0 pt-4 md:p-4">
        <UserInfoSection userData={userData} />
        <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
          <div className="mt-8 md:mt-4">
            <h5 className="mb-2">
              <b>Receitas criadas pelo usuário:</b>
            </h5>
            <ListRecipeSection listRecipe={userRecipes} userData={userData} />
          </div>
          <div className="mt-4 flex flex-col">
            <h5 className="mb-2">
              <b>Receitas curtidas:</b>
            </h5>
            <ListRecipeSection
              listRecipe={userRecipesLiked}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
