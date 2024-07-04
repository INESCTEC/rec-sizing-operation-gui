import styles from "./Header.module.css";
import NavBar from "./Navigation/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/enershare.png";

function Header() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img
            className={styles.logo}
            onClick={() => setSelected(null)}
            src={logo}
          />
        </Link>
        <NavBar selected={selected} setSelected={setSelected} />
      </header>
    </>
  );
}

export default Header;
