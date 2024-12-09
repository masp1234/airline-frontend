import { UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import ApiClient from "../services/api-client";

export const handleLogout = async (
  setUser: (role: null, email: null) => void,
  toast: (options: UseToastOptions) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    const apiClient = new ApiClient(`/Users/logout`);

    const response = apiClient.create(null,'POST');
    if ((await response).status === 200) {
      setUser(null, null);
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
