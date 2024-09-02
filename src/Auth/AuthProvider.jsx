import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../Notification/NotificationProvider";

const AuthContext = createContext();

// "http://localhost:8081/api/v1/users/login" - this url needs to be the login api

const AuthProvider = ({ children }) => {
  const notification = useNotification();
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      const res = await response.json();

      console.log(res)
      if (res) {
        setUser(res.email);
        setToken(res.accessToken);
        localStorage.setItem("user", res.email);
        localStorage.setItem("site", res.accessToken);
        navigate("/dashboard");
        return;
      }

      throw new Error(res.message);
    } catch (err) {
      console.log(err);

      // The following 5 lines should be removed for authentication to work
      setUser("email");
      setToken("token");
      localStorage.setItem("user", "email");
      localStorage.setItem("site", "token");
      navigate("/dashboard");
    }
  };

  const signUp = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);


      const res = await response.json();
      if(response.status !== 201){
        throw new Error(res.message);
      }


      if (res) {
        navigate("/login");
        return;
      }

    } catch (err) {
      notification.setTitle("Register failed.")
      notification.setNotification(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};