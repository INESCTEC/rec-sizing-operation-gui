import { Link } from "react-router-dom";
import styles from "./LeftNavBar.module.css";
import LeftNavBarItem from "./LeftNavBarItem";
import { useState } from "react";
import {
  DataTable,
  ChevronLeft,
  ChevronRight,
  PricingTraditional,
  Search
} from "@carbon/icons-react";
import { useLocation } from "react-router-dom";

function LeftNavBar({ hidden, setHidden }) {
  var [selected, setSelected] = useState(useLocation().pathname);
  var buttons = [
    {
      text: "Pricing",
      link: "/pricing",
      icon: <PricingTraditional />,
    },
    {
      text: "Sizing",
      link: "/sizing",
      icon: <DataTable />,
    },
    {
      text: "Search Meters",
      link: "/meters",
      icon: <Search />,
    },
  ];

  const buttonClassName = (button) =>
    selected === button["link"] ? styles.buttonSelected : styles.button;

  const navBarContainerStyles = hidden
    ? styles.navBarContainerHidden + " " + styles.navBarContainer
    : styles.navBarContainer;

  return (
    <>
      <div className={`${navBarContainerStyles} column flex-space-between`}>
        <ul className={styles.navBar}>
          {buttons.map((button) => (
            <li className={buttonClassName(button)} key={button["link"]}>
              <Link
                tabIndex="-1"
                onClick={() => {
                  setSelected(button["link"]);
                }}
                to={button["link"]}
                className={styles.link}
              >
                <LeftNavBarItem
                  hidden={hidden}
                  text={button["text"]}
                  icon={button["icon"]}
                />
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`${styles.hideButton} primary-button`}
          onClick={() => setHidden(!hidden)}
        >
          {" "}
          {hidden ? <ChevronRight /> : <ChevronLeft />}{" "}
        </button>
      </div>
    </>
  );
}

export default LeftNavBar;
