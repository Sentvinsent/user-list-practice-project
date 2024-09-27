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
  const { error, errorMessage, isModalOpened } = useSelector(
    (state) => state.input
  );
  const { formStatus, formError } = useSelector((state) => state.users);
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
            isModalOpened: true,
          })
        );
        return;
      }
      dispatch(
        setError({
          error: false,
          message: "",
          isModalOpened: false,
        })
      );

      dispatch(addRequest(data));

      if (formStatus === "failed") {
        dispatch(
          setError({
            error: true,
            message: formError,
            isModalOpened: true,
          })
        );
        return;
      }
      userNameRef.current.value = "";
      userAgeRef.current.value = "";
    },
    [dispatch, formStatus, formError]
  );
  const closeModalHandler = useCallback(() => {
    dispatch(
      setError({
        error: error,
        message: errorMessage,
        isModalOpened: false,
      })
    );
  }, [dispatch, error, errorMessage]);

  return (
    <>
      {isModalOpened && (
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
            type="number"
            label="User's age:"
            ref={userAgeRef}
          />
          <button
            className={classes["submit-button"]}
            type="submit"
            disabled={formStatus === "loading"}
          >
            {formStatus === "loading" ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Card>
    </>
  );
};

export default UserForm;
