import styles from "./NavBar.module.css";
import NavItem from "./NavItem";
import { Menu } from "@carbon/icons-react";
import { Link } from "react-router-dom";

function NavBar({ selected, setSelected }) {
  const buttons = [
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
    },
  ];
  return (
    <>
      <div className={styles.navContainer}>
        <ul className={styles.navBar}>
          {buttons.map((button) => (
            <li className={styles.navItem} key={button.link}>
              <Link
                className={styles.link}
                key={button["link"]}
                onClick={() => setSelected(button["link"])}
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
        <Menu className={styles.navMenu} />
      </div>
    </>
  );
}

export default NavBar;
