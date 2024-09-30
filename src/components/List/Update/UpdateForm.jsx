//3rd party imports
import { CIcon } from "@coreui/icons-react";
import { cilCheckAlt, cilX } from "@coreui/icons";

//Styles
import classes from "./UpdateForm.module.css";
import { CSSTransition } from "react-transition-group";

//State management
import { inputValidation } from "../../../helpers/inputValidations";
import { setItemError } from "../../../store/Slices/userListSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateRequest } from "../../../store/thunks";
import { useCallback, memo, useRef, useEffect } from "react";
import UpdateFormInput from "./UpdateFormInput";

const UpdateForm = memo(({ id, name, age, onClose }) => {
  const { itemStatus, itemError } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const enteredName = useRef();
  const enteredAge = useRef();

  const errorTimeout = useCallback(() => {
    setTimeout(() => {
      dispatch(setItemError(null));
    }, 4000);
  }, [dispatch]);

  useEffect(() => {
    enteredName.current.value = name;
    enteredAge.current.value = age;
  }, [name, age]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      userName: enteredName.current.value,
      userAge: enteredAge.current.value,
    };

    const validity = inputValidation(data);

    if (validity.error) {
      dispatch(setItemError(validity.errorMessage));
      errorTimeout();
      return;
    }
    if (data.userName === name && data.userAge === age) {
      onClose();
      return;
    }
    dispatch(updateRequest({ id, ...data }));
    if (itemStatus === "failed") {
      errorTimeout();
      return;
    }
    onClose();
  };

  return (
    <>
      <form id="updateForm" className={classes.form} onSubmit={handleUpdate}>
        <div className={classes.input}>
          <UpdateFormInput
            placeholder="User name:"
            type="text"
            styling="name"
            ref={enteredName}
          />
          <UpdateFormInput
            placeholder="User age:"
            type="number"
            styling="age"
            ref={enteredAge}
          />
        </div>
        <div>
          <button type="submit" className={classes.iconButton}>
            <CIcon icon={cilCheckAlt} />
          </button>
          <button
            className={classes.iconButton}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <CIcon icon={cilX} />
          </button>
        </div>
      </form>

      <CSSTransition
        in={itemError}
        timeout={800}
        classNames={{
          enter: classes.enter,
          enterActive: classes["enter-active"],
          exit: classes.exit,
          exitActive: classes["exit-active"],
        }}
        unmountOnExit
      >
        <p className={classes["error-text"]}>{itemError}</p>
      </CSSTransition>
    </>
  );
});

export default UpdateForm;
