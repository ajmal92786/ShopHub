import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);
export default useUserContext;

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  async function fetchUserDetails() {
    try {
      const res = await fetch(
        `${BASE_URL}/api/user?email=ajmalbly27@gmail.com`
      );
      const json = await res.json();

      setUserInfo(json.user);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  );
}
