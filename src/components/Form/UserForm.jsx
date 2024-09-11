import classes from "./UserForm.module.css";
import Card from "../Card/Card";
import FormInput from "./FormInput";

const UserForm = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // console.log("userNameInput:", input1);
    // console.log("Input 2:", input2);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormInput id="userNameInput" type="text" label="User's name:" />
        <FormInput id="userAgeInput" type="text" label="User's age:" />
        <button className={classes["submit-button"]} type="submit">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default UserForm;
