import { memo, forwardRef } from "react";
import styles from "./UpdateFormInput.module.css";

const FormInput = forwardRef(({ type, placeholder, styling }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={styles[styling]}
    />
  );
});

const UpdateFormInput = memo(FormInput);

export default UpdateFormInput;
