import styles from "./Header.module.css";
import NavBar from "./Navigation/NavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/enershare.png";
import { Menu } from "@carbon/icons-react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const buttons = [/*
    {
      text: "About",
      link: "about",
    },
    {
      text: "News",
      link: "news",
    },
    {
      text: "Resources",
      link: "resources",
    },
    {
      text: "Contact us",
      link: "contactus",
    },*/
  ];

  const locs = ["/login", "/sign-up", "/recover-password"];
  return (
    <>
      <header
        className={styles.header}
        style={
          locs.includes(location.pathname)
            ? { justifyContent: "center" }
            : undefined
        }
      >
        {locs.includes(location.pathname) ? (
          <Link to="/">
            <img
              className={styles.logo}
              onClick={() => setSelected(null)}
              src={logo}
              style={{marginLeft: "0"}}
            />
          </Link>
        ) : (
          <>
            <span className={styles.hide}>
              <OverflowMenu
                aria-label="overflow-menu"
                renderIcon={Menu}
                iconClass={styles.navMenuIcon}
                className={styles.navMenu}
              >
                {buttons.map((button) => (
                  <OverflowMenuItem
                    key={button.link}
                    itemText={button.text}
                    onClick={() => navigate(button.link)}
                  ></OverflowMenuItem>
                ))}
              </OverflowMenu>
            </span>
            <Link to="/dashboard">
              <img
                className={styles.logo}
                onClick={() => setSelected(null)}
                src={logo}
              />
            </Link>
            <NavBar selected={selected} setSelected={setSelected} />
          </>
        )}
      </header>
    </>
  );
}

export default Header;
