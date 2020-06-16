import { IUserInfo } from './user-info';

export interface IAuthData {
    isLoggedIn: boolean;
    userInfo?: IUserInfo;
}
