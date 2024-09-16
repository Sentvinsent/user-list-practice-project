import classes from "./UserForm.module.css";
import Card from "../Card/Card";
import FormInput from "./FormInput";

import { useRef } from "react";
import { addRequest } from "../../store/thunks";
import { useSelector, useDispatch } from "react-redux";

const UserForm = () => {
  const { status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userNameRef = useRef();
  const userAgeRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: userNameRef.current.value,
      userAge: Number(userAgeRef.current.value),
    };

    dispatch(addRequest(data));
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormInput
          id="userNameInput"
          type="text"
          label="User's name:"
          ref={userNameRef}
        />
        <FormInput
          id="userAgeInput"
          type="text"
          label="User's age:"
          ref={userAgeRef}
        />
        <button className={classes["submit-button"]} type="submit">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default UserForm;
