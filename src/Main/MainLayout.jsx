import Interface from "./Interface";
import styles from "./MainLayout.module.css";
import { Redirect } from "./Navigation/Redirect";
import { Routes, Route } from "react-router-dom";
import Login from "../Auth/Login";
import PrivateRoute from "../Auth/PrivateRoute";
import SignUp from "../Auth/SignUp";
import Profile from "../Auth/Profile";

function MainLayout() {
  return (
    <>
      <div className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Interface />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
              path=""
              element={<Redirect/>}
            />
        </Routes>
      </div>
    </>
  );
}

export default MainLayout;
