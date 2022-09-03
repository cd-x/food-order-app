import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const items = [{ id: "c1", name: "Shushi", price: "99.99", amount: 1 }];
  const cartItems = (
    <ul>
      {items.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>99.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
