import styles from "./NavBar.module.css";
import NavItem from "./NavItem";
import { Menu, User, UserAvatar } from "@carbon/icons-react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { useEffect } from "react";

function NavBar({ selected, setSelected }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname.split("/")[1]);
  }, [location.pathname]);

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
  return (
    <>
      <div className={styles.navContainer}>
        <span className="row flex-center">
          <ul className={styles.navBar}>
            {buttons.map((button) => (
              <li className={styles.navItem} key={button.link}>
                <Link
                  className={styles.link}
                  key={button["link"]}
                  to={button["link"]}
                >
                  <NavItem
                    text={button["text"]}
                    selected={selected === button["link"]}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {auth.token ? (
            <OverflowMenu
              aria-label="overflow-menu"
              renderIcon={UserAvatar}
              iconClass={styles.profileIcon}
              className={styles.profile}
              flipped={true}
            >
              <OverflowMenuItem
                itemText="Edit Profile"
                onClick={() => navigate("/profile")}
              ></OverflowMenuItem>

              <OverflowMenuItem
                hasDivider
                isDelete
                itemText="Logout"
                onClick={auth.logOut}
              />
            </OverflowMenu>
          ) : undefined}

          {!auth.token && location.pathname === "/" ? (
            <UserAvatar className={styles.profileIcon} onClick={() =>  navigate("/login")}></UserAvatar>
          ) : undefined}
        </span>
      </div>
    </>
  );
}

export default NavBar;
