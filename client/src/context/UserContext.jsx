import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUserById } from "../api";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [cookies, setCookie] = useCookies(["userId"]);
  const [ready, setReady] = useState(false);
  const userId = cookies.userId;
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const res = await getUserById(userId);
          setUser(res.data);
          setReady(true);
        } catch (error) {
          console.log(error);
          setUser(null);
        }
      } else {
        setReady(true);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {ready ? children : <></>}
    </UserContext.Provider>
  );
}

export default UserContext;
