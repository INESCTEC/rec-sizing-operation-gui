import styles from "./NavBar.module.css";

function NavItem({ text, selected }) {
  const className = selected ? styles.navItemTextSelected : styles.navItemText;
  return (
    <>
      <p className={className}>{text}</p>
    </>
  );
}

export default NavItem;
