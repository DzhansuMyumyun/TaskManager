import api from "./axios";

export const apiConnection = async() => {
    const response = await api.get("/TaskItems");
    return response.data;
}