import styles from "./LeftNavBar.module.css";
function LeftNavBarItem({ hidden, text, icon }) {
  return (
    <>
      <div className={styles.buttonContent}>
        {hidden ? (
          undefined
        ) : (
          <p className={styles.hide} style={{ textWrap: "nowrap" }}>{text}</p>
        )}
        {icon}
      </div>
    </>
  );
}

export default LeftNavBarItem;
