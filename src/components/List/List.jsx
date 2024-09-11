import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchUsers } from "../../store/thunks";

import Card from "../Card/Card";
import ListItem from "./ListItem";
import styles from "./List.module.css";

const List = () => {
  const { users, status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let content;

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
