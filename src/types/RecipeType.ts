import CommentType from '@/types/CommentType';
import ImageType from '@/types/ImageType';
import IngredientType from '@/types/IngredientType';
import UserType from '@/types/UserType';

export default interface RecipeType {
    title?: string,
    description?: string,
    methodPreparation?: string,
    images?: FileList,
    imagesSRC?: Array<string>,
    ingredients?: Array<IngredientType>,
    author?: UserType,
    preparetionTime?: string,
    preparetionTimeHours?: string,
    preparetionTimeMinutes?: string,
    likeNumber?: number,
    commentsNumber?: number,
    comments?: Array<CommentType>,
    createdDatetime?: string
}