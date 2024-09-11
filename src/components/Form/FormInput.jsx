import classes from "./UserForm.module.css";

const FormInput = (props) => {
  return (
    <div>
      <label className={classes.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input className={classes.input} type={props.type} id={props.id} />
    </div>
  );
};

export default FormInput;
