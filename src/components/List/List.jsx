import { useCallback, useEffect, useMemo } from "react";

//Components
import ListItem from "./ListItem";
import Card from "../Card/Card";

//State management
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteRequest } from "../../store/thunks";

//Styles
import "../../animations.css";
import styles from "./List.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

//Component code
const List = () => {
  const { users, status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteRequest(id));
    },
    [dispatch]
  );

  const userList = useMemo(() => {
    return users.map((user) => {
      return (
        <CSSTransition
          key={user.id}
          timeout={300}
          classNames={{
            enter: "enter",
            enterActive: "enter-active",
            exit: "exit",
            exitActive: styles["exit-active"],
          }}
        >
          <ListItem
            id={user.id}
            name={user.userName}
            age={user.userAge}
            onDelete={handleDelete}
          />
        </CSSTransition>
      );
    });
  }, [users, handleDelete]);

  const setContent = useCallback(() => {
    if (status === "loading") {
      return <p className={styles["no-user-text"]}>Loading...</p>;
    }

    if (status === "failed") {
      return <p className={styles["error-text"]}>Error: {error}</p>;
    }
    if (status === "succeeded") {
      if (users.length === 0) {
        return <p className={styles["no-user-text"]}>No users in the list!</p>;
      }
      return <TransitionGroup component="ul">{userList}</TransitionGroup>;
    }
  }, [status, error, userList, users.length]);

  let content = setContent();

  return (
    <>
      <Card>{content}</Card>
    </>
  );
};

export default List;
