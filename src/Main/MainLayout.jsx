import Interface from "./Interface";
import styles from "./MainLayout.module.css";
import EmptyPage from "./EmptyPage";
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
            path="/"
            element={
              <>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: "-1",
                  }}
                ></div>
                <h1 style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>
                  Empty Home Page
                </h1>
              </>
            }
          />
          <Route path="/about" element={<EmptyPage />} />
          <Route path="/news" element={<EmptyPage />} />
          <Route path="/resources" element={<EmptyPage />} />
          <Route path="/contactus" element={<EmptyPage />} />
        </Routes>
      </div>
    </>
  );
}

export default MainLayout;
