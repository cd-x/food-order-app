import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountAsNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountAsNumber < 1 ||
      enteredAmountAsNumber > 5
    ) {
      setIsFormValid(false);
      return;
    }
    props.onAddToCart(enteredAmountAsNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isFormValid && <p>Please enter amount between (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
