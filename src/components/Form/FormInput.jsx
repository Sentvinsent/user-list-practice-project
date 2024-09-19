import classes from "./FormInput.module.css";
import { forwardRef } from "react";

const FormInput = forwardRef((props, ref) => {
  return (
    <div>
      <label className={classes.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={classes.input}
        type={props.type}
        id={props.id}
        ref={ref}
      />
    </div>
  );
});

export default FormInput;
