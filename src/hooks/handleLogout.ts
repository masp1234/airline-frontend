import BASE_URL from "../util/baseUrl.ts";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Successfully logged out");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return handleLogout;
};

export default Logout;
