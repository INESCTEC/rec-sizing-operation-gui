import Interface from "./Interface";
import styles from "./MainLayout.module.css";
import EmptyPage from "./EmptyPage";
import { Routes, Route } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <div className={styles.main}>
        <Routes>
          <Route path="*" element={<Interface />} />
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
