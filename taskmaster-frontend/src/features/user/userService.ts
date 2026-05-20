import toast from "react-hot-toast";
import api from "../../api/axios";
import type {  User, UserLoginDto, UserRegisterDto } from "../../types/user";
import type { AccessToken, LoginResponse } from "../../types/userLogin";
import { useUser } from "./useUser";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

//Get
export const getUsers = async () => {
  try {
    const response = await api.get("/Auth"); 
    return response.data.Data;
  } catch (error) {
    console.error("User fetch failed", error);
    return [];
  }
};

//Register
export const createUser = async (
    user:UserRegisterDto
): Promise<UserRegisterDto> =>{
    const response = await api.post<ApiResponse<UserRegisterDto>>("/Auth/register", user);
    const { data, message, success } = response.data;

    if (success && message) {
        toast.success(message);
    }
    return data;
}


//Login
export const loginUser = async (
    user:UserLoginDto
): Promise<AccessToken> =>{
    const response = await api.post("/Auth/login", {
        Email: user.email,
        Password: user.password
    });
    const { Token, Expiration } = response.data;

    if (!Token) {
        toast.error("Login failed: No token received");
        throw new Error("No token");
    }

    localStorage.setItem("token", Token);
    localStorage.setItem("userEmail", user.email);
    
    api.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

    toast.success("Welcome back!");

    return { token: Token, expiration: Expiration }; 
}