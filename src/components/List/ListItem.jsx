//3rd party packages
import { CIcon } from "@coreui/icons-react";
import { cilTrash, cilPen } from "@coreui/icons";

//Styles
import styles from "./ListItem.module.css";
import UpdateForm from "./UpdateForm";

//State management
import { useState, useCallback, memo } from "react";

const ListItem = memo((props) => {
  const [isForUpdate, setIsForUpdate] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsForUpdate((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsForUpdate(false);
  }, []);
  return (
    <li className={styles["list-item"]}>
      <div>
        <p className={styles["list-item__text"]}>
          {props.name} is {props.age} years old.
        </p>
        <CIcon icon={cilPen} className={styles.icon} onClick={handleUpdate} />
        <CIcon
          icon={cilTrash}
          className={styles.icon}
          onClick={() => props.onDelete(props.id)}
        />
      </div>
      {isForUpdate && <UpdateForm {...props} onClose={handleClose} />}
    </li>
  );
});

export default ListItem;
