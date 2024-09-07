import styles from "./ListItem.module.css";
import { CIcon } from "@coreui/icons-react";
import { cilTrash, cilPen } from "@coreui/icons";

const ListItem = (props) => {
  return (
    <li className={styles["list-item"]}>
      <div>
        <p className={styles["list-item__text"]}>
          {props.name} is {props.age} years old.
        </p>
        <CIcon icon={cilPen} className={styles.icon} />
        <CIcon icon={cilTrash} className={styles.icon} />
      </div>
    </li>
  );
};

export default ListItem;
