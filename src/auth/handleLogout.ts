import { UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import ApiClient from "../services/api-client";

export const handleLogout = async (
  handleUserOnLogout: () => void,
  toast: (options: UseToastOptions) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    const apiClient = new ApiClient(`/Users/logout`);
    handleUserOnLogout();
    const response = apiClient.create(null,'POST');
    if ((await response).status === 200 || (await response).status === 201) {
      toast({
        title: "Logged out",
        description: "You have successfully logged out",
        status: "success", // Matches Chakra UI's allowed statuses
        duration: 4000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Logout failed",
        description: "Something went wrong",
        status: "error", // Matches Chakra UI's allowed statuses
        duration: 4000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    toast({
      title: "Logout failed",
      description: "Something went wrong",
      status: "error", // Matches Chakra UI's allowed statuses
      duration: 4000,
      isClosable: true,
    });
  }
};
