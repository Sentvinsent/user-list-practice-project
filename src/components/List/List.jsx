import { useEffect, useMemo } from "react";

//Components
import ListItem from "./ListItem";
import Card from "../Card/Card";

//State management
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/thunks";

//Styles
import styles from "./List.module.css";

//Component code
const List = () => {
  const { users, status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userList = useMemo(() => {
    return users.map((user) => {
      return (
        <ListItem
          key={user._id}
          id={user._id}
          name={user.userName}
          age={user.userAge}
        />
      );
    });
  }, [users]);

  let content;

  if (status === "loading") {
    content = <p className={styles["no-user-text"]}>Loading...</p>;
  }

  if (error) {
    content = <p className={styles["error-text"]}>Error: {error}</p>;
  } else {
    {
      users.length === 0
        ? (content = (
            <p className={styles["no-user-text"]}>No users in the list!</p>
          ))
        : (content = <ul>{userList}</ul>);
    }
  }

  return <Card>{content}</Card>;
};

export default List;
