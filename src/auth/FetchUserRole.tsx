import BASE_URL from "../util/baseUrl.ts";

export const fetchUserRole = async (): Promise<string | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Users/currentRole`, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        console.error("Failed to fetch user role:", response.statusText);
        return null;
      }
  
      const data = await response.json();
      console.log("Fetched user role:", data.role);
      return data.role;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };
  