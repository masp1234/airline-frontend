import ApiClient from "../services/api-client";
import  { AxiosError } from "axios";
import LoginUser from "../types/LoginUser";

export const handleLogin = async (
  user : LoginUser ,
  toast: (options: { title: string; description: string; status: "success" | "error" | "loading"; duration: number; isClosable: boolean }) => void
) => {
  const apiClient = new ApiClient<LoginUser>(`/Users/login`);

  try {
    const response = apiClient.create(user, 'POST');
    if ((await response).status === 200){
      toast({
        title: "Logged in",
        description: "You have successfully logged in",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      return  (await response).data;
    }

  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.status === 401) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    toast({
      title: "Login failed",
      description: "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};