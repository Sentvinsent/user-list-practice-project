//3rd party packages
import { CIcon } from "@coreui/icons-react";
import { cilTrash, cilPen } from "@coreui/icons";

//Styles
import { CSSTransition } from "react-transition-group";
import styles from "./ListItem.module.css";
import UpdateForm from "./Update/UpdateForm";

//State management
import { useState, useCallback, memo, useMemo } from "react";

const ListItem = memo((props) => {
  const [isForUpdate, setIsForUpdate] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsForUpdate((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsForUpdate(false);
  }, []);

  const rendredItem = useMemo(() => {
    return (
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
    );
  }, [props, handleUpdate]);

  return (
    <li className={styles["list-item"]}>
      {rendredItem}
      <CSSTransition
        in={isForUpdate}
        timeout={800}
        classNames={{
          enter: styles.enter,
          enterActive: styles["enter-active"],
          exit: styles.exit,
          exitActive: styles["exit-active"],
        }}
        unmountOnExit
      >
        <UpdateForm {...props} onClose={handleClose} />
      </CSSTransition>
    </li>
  );
});

export default ListItem;
