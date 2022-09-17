import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isOrderClicked, setIsOrderClicked] = useState(false);
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderClickHandler = () => {
    setIsOrderClicked(true);
  };
  const cancelOrderHandler = () => {
    setIsOrderClicked(false);
    props.onCloseClick();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onBackDropClick={props.onCloseClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrderClicked && <Checkout onCancel={cancelOrderHandler} />}
      {!isOrderClicked && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onCloseClick}
          >
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={orderClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
