import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartBtnHighlighted, setCartBtnHighlighted] = useState(false);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((prev, item) => {
    return prev + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    cartBtnHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    // instructions
    setCartBtnHighlighted(true);

    // timeout function
    const timer = setTimeout(() => {
      setCartBtnHighlighted(false);
    }, 300);

    // clear instructions
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
