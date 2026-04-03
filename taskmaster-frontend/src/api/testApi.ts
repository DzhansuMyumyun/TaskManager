import api from "./axios";

export const testConnection = async() => {
    const response = await api.get("/TaskItems");
    return response.data;
}