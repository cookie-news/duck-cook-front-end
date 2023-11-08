import UserType from '@/types/UserType';

export default interface CommentType {
    author: UserType,
    text: string,
    createdDatetime: string
}