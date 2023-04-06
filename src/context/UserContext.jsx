import React, { createContext, useState } from "react";
const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState({ username: "", role: "", isAuth: false });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
