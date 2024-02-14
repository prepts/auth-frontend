import { isEmpty } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("authtoken");

    setIsLoggedIn(isEmpty(userInfo));
  }, []);

  const login = () => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: "thiru@gmail.com",
        password: "softsuave#123",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        debugger
        console.log(result);
        localStorage.setItem("authtoken", result.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
