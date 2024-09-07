import styles from "./List.module.css";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import ListItem from "./ListItem";

const List = () => {
  const users = useSelector((state) => state.users.users);
  const userList = users.map((user) => {
    return (
      <ListItem key={user.id} id={user.id} name={user.name} age={user.age} />
    );
  });

  return (
    <Card>
      {users.length === 0 && (
        <p className={styles["no-user-text"]}>No users in the list!</p>
      )}
      {users.length > 0 && <ul>{userList}</ul>}
    </Card>
  );
};

export default List;
