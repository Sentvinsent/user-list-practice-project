import React, { useState } from "react";
import classes from "./UserForm.module.css";

const UserForm = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <label className={classes.label} tmlFor="input1">
          User's name:
        </label>
        <input
          className={classes.input}
          type="text"
          id="input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div>
        <label className={classes.label} htmlFor="input2">
          User's age:
        </label>
        <input
          className={classes.input}
          type="text"
          id="input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <button className={classes["submit-button"]} type="submit">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
