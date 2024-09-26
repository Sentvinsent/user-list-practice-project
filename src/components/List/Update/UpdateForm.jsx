//3rd party imports
import { CIcon } from "@coreui/icons-react";
import { cilCheckAlt, cilX } from "@coreui/icons";

//Styles
import "../../../animations.css";
import classes from "./UpdateForm.module.css";
import { CSSTransition } from "react-transition-group";

//State management
import { inputValidation } from "../../../helpers/inputValidations";
import { useDispatch, useSelector } from "react-redux";
import { updateRequest } from "../../../store/thunks";
import { useCallback, useState } from "react";

const UpdateForm = ({ id, name, age, onClose }) => {
  const { itemStatus, itemError } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currAge: age,
    currName: name,
    error: false,
    errorMessage: "",
  });

  const errorTimeout = useCallback(() => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        error: false,
        errorMessage: "",
      }));
    }, 3000);
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      userName: state.currName,
      userAge: state.currAge,
    };
    const validity = inputValidation(data);

    if (validity.error) {
      setState((prevState) => ({
        ...prevState,
        error: true,
        errorMessage: validity.errorMessage,
      }));
      errorTimeout();
      return;
    }
    if (state.currName === name && state.currAge === age) {
      onClose();
      return;
    }
    dispatch(updateRequest({ id, ...data }));
    if (itemStatus === "failed") {
      setState((prevState) => ({
        ...prevState,
        error: true,
        errorMessage: itemError,
      }));
      errorTimeout();
      return;
    }
    onClose();
  };

  return (
    <>
      <form id="updateForm" className={classes.form} onSubmit={handleUpdate}>
        <div className={classes.input}>
          <input
            className={classes.name}
            value={state.currName}
            placeholder="User name"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                currName: e.target.value,
              }))
            }
          />
          <input
            className={classes.age}
            type="number"
            value={state.currAge}
            placeholder="Age"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                currAge: Number(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <button type="submit" className={classes.iconButton}>
            <CIcon icon={cilCheckAlt} />
          </button>
          <button className={classes.iconButton} onClick={onClose}>
            <CIcon icon={cilX} />
          </button>
        </div>
      </form>

      <CSSTransition
        in={state.error}
        timeout={300}
        classNames={{
          enter: "enter",
          enterActive: "enter-active",
          exit: "exit",
          exitActive: "exit-active",
        }}
        unmountOnExit
      >
        <p className={classes["error-text"]}>{state.errorMessage}</p>
      </CSSTransition>
    </>
  );
};

export default UpdateForm;
