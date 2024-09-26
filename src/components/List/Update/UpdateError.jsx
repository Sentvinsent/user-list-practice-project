import classes from "./UpdateError.module.css";
import { useState } from "react";

const UpdateError = () => {
  const [state, setState] = useState({
    error: false,
    errorMessage: "",
  });

  return <p className={classes["error-text"]}>{state.errorMessage}</p>;
};

export default UpdateError;
