
export interface UserRegisterDto{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    
}

export interface UserLoginDto{
    email:string;
    password:string;
}

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}