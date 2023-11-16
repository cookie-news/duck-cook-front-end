import { User } from '../data/user.service';

export default interface CommentType {
    author: User,
    text: string,
    createdDatetime: string
}