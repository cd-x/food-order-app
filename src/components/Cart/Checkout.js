import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim().length === 0;
const isFiveChars = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef("");
  const streetInputRef = useRef("");
  const postalInputRef = useRef("");
  const cityInputRef = useRef("");
  const [formError, setFormError] = useState("");

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isNameValid = !isEmpty(enteredName);
    const isStreetValid = !isEmpty(enteredStreet);
    const isPostalValid = !isEmpty(enteredPostal) && isFiveChars(enteredPostal);
    const isCityValid = !isEmpty(enteredCity);

    if (!isNameValid) {
      setFormError("Name must not be empty !");
    } else if (!isStreetValid) {
      setFormError("Street must not be empty !");
    } else if (!isPostalValid) {
      setFormError("Postal code must be of length 5");
    } else if (!isCityValid) {
      setFormError("City must not be empty !");
    } else {
      setFormError("");
      console.log({
        enteredName,
        enteredCity,
        enteredStreet,
        enteredPostal,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {formError && (
        <div>
          <p className={classes.invalidForm}>{formError}</p>
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
