import BASE_URL from "../util/baseUrl";
import { UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export const handleLogout = async (
  setRole: (role: null) => void,
  toast: (options: UseToastOptions) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/Users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setRole(null);
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
