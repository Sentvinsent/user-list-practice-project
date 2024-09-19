import { useRef, useCallback } from "react";

//Components
import Modal from "../Modal/Modal";
import FormInput from "./FormInput";
import Card from "../Card/Card";

//Styles
import classes from "./UserForm.module.css";

//State management
import { setError } from "../../store/Slices/inputValidationSlice";
import { inputValidation } from "../../helpers/inputValidations";
import { useSelector, useDispatch } from "react-redux";
import { addRequest } from "../../store/thunks";

//Component code
const UserForm = () => {
  const { error, errorMessage } = useSelector((state) => state.input);
  const dispatch = useDispatch();

  const userNameRef = useRef();
  const userAgeRef = useRef();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data = {
        userName: userNameRef.current.value,
        userAge: Number(userAgeRef.current.value),
      };
      const validity = inputValidation(data);
      if (validity.error) {
        dispatch(
          setError({
            error: true,
            message: validity.errorMessage,
            showModal: true,
          })
        );
        return;
      }
      dispatch(
        setError({
          error: false,
          message: "",
          showModal: false,
        })
      );
      dispatch(addRequest(data));
    },
    [dispatch]
  );

  const closeModalHandler = useCallback(() => {
    dispatch(
      setError({
        error: error,
        message: errorMessage,
        showModal: false,
      })
    );
  }, [dispatch]);

  return (
    <>
      {error && (
        <Modal onClose={closeModalHandler}>
          <h2>An error occured</h2>
          <p>{errorMessage}</p>
        </Modal>
      )}

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
    </>
  );
};

export default UserForm;
