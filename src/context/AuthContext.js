import { isEmpty } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "../utils";
import { customAxios } from "../API/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = getItem("authtoken");

    setIsLoggedIn(!isEmpty(userInfo));
  }, []);

  const login = () => {
    customAxios
      .post("/auth/login", {
        email: "thiru@gmail.com",
        password: "softsuave#123",
      })
      .then((res) => {
        console.log({ logiRes: res });
        setItem("authtoken", res.data.token);
        setItem("expire", res.data.expire);
      })
      .catch((err) => {
        console.log({ loginError: err });
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
