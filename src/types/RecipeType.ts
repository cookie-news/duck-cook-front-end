import CommentType from '@/types/CommentType';
import ImageType from '@/types/ImageType';
import IngredientType from '@/types/IngredientType';
import UserType from '@/types/UserType';

export default interface RecipeType {
    id?: string,
    idUser?: string,
    title?: string,
    description?: string,
    images?: FileList,
    imagesSRC?: Array<string>,
    ingredients?: Array<IngredientType>,
    author?: UserType,
    preparationTimeConverted?: string,
    preparetionTimeHours?: string,
    preparetionTimeMinutes?: string,
    preparationMethod?: string,
    likeNumber?: number,
    commentsNumber?: number,
    comments?: Array<CommentType>,
    createdDatetime?: string
}