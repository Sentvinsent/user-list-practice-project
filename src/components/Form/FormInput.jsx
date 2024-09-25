import { forwardRef } from "react";

//Styles
import classes from "./FormInput.module.css";

const FormInput = forwardRef(({ id, label, type }, ref) => {
  return (
    <div>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input className={classes.input} type={type} id={id} ref={ref} />
    </div>
  );
});

export default FormInput;
