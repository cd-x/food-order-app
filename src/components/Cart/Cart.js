import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isOrderClicked, setIsOrderClicked] = useState(false);
  const [orderId, setOrderId] = useState("");

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

  const successModalCloseHandler = () => {
    setOrderId("");
    props.onCloseClick();
  };
  const orderSubmitHandler = async (customerInfo) => {
    await fetch(
      "https://react-http-ee4c9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          customerInfo: customerInfo,
          orderItems: items,
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => {
        cartCtx.clear();
        setOrderId(order.name);
      });
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

  const successModal = (
    <Modal onBackDropClick={props.onCloseClick}>
      <p>
        <h5>Order Placed Successfully with Order ID:</h5> <i>{`${orderId}`}</i>
      </p>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={successModalCloseHandler}
        >
          Close
        </button>
      </div>
    </Modal>
  );

  const cartModal = (
    <Modal onBackDropClick={props.onCloseClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrderClicked && (
        <div className={classes.addressForm}>
          <Checkout
            onCancel={cancelOrderHandler}
            onOrderSubmit={orderSubmitHandler}
          />
        </div>
      )}
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

  return (
    <Fragment>
      {orderId && successModal}
      {!orderId && cartModal}
    </Fragment>
  );
};

export default Cart;
