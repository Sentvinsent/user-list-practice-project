import classes from "./UpdateForm.module.css";
import { CIcon } from "@coreui/icons-react";
import { cilCheckAlt, cilX } from "@coreui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputValidation } from "../../helpers/inputValidations";
import { updateRequest } from "../../store/thunks";

const UpdateForm = ({ id, name, age, onClose }) => {
  const { itemStatus, itemError } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currAge: age,
    currName: name,
    error: false,
    errorMessage: "",
  });

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
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          error: false,
          errorMessage: "",
        }));
      }, 3000);
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
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          error: false,
          errorMessage: "",
        }));
      }, 3000);
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
      {state.error && (
        <p className={classes["error-text"]}>{state.errorMessage}</p>
      )}
    </>
  );
};

export default UpdateForm;
