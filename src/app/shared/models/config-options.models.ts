import { IUserInfo } from './user-info';

export interface IConfigOptions extends IUserInfo {
    login: string;
    email: string;
}
