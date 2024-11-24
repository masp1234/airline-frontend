import BASE_URL from "../util/baseUrl";

export const handleLogin = async (
  email: string,
  password: string,
  setRedirect: (value: boolean) => void,
  toast: (options: { title: string; description: string; status: "success" | "error" | "loading"; duration: number; isClosable: boolean }) => void
) => {

  try {
    const response = await fetch(`${BASE_URL}/Users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      toast({
        title: "Logged in",
        description: "You have successfully logged in",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setRedirect(true);
      return data.role;
    } else if (response.status === 401) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log("Error logging in as: ", email, ": ", error);
    toast({
      title: "Login failed",
      description: "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};