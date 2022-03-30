export interface UsersRegisterDTO {
    email: string;
    password?: string;
    mobile: string;
    refresh_token?: string;
}

export interface IUserDTO {
    id: number;
    email: string;
    mobile: string;
    password: string;
    refresh_token: string;
    roles: IRoleDTO[];
    created_at: number;
    updated_at: number;
}

export interface IRoleDTO {
    id: number;
    name: string;
    machine_name: string
}