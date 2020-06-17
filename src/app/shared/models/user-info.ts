export interface IBaseUserInfo {
    firstName: string;
    secondName: string;
    id: string;
}

export interface IUserInfo extends IBaseUserInfo {
    isAdmin: boolean;
}
