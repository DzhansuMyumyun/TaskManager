import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserLoginDto, UserRegisterDto } from "../../types/user";
import { createUser,loginUser } from "./userService";
import toast from "react-hot-toast";

export const useUserMutations = () =>{ 
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn:(data:UserRegisterDto) => createUser(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: () => {
            toast.error("Failed to register a user");
        },
    })

  const login = useMutation({
    mutationFn: (credentials: UserLoginDto) => loginUser(credentials),
    onSuccess: (data) => {
       console.log("Mutation successful, token received");
    }
  });

  return { login, create };
};
