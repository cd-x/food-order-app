import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const removingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const removingItem = state.items[removingItemIndex];
      const updatedTotalAmountAfterRemoval =
        state.totalAmount - removingItem.price;
      const updatedItem = {
        ...removingItem,
        amount: removingItem.amount - 1,
      };
      let updatedItemsAfterRemoval;
      if (updatedItem.amount > 0) {
        updatedItemsAfterRemoval = [...state.items];
        updatedItemsAfterRemoval[removingItemIndex] = updatedItem;
      } else {
        updatedItemsAfterRemoval = state.items.filter(
          (item) => item.id !== action.id
        );
      }
      return {
        items: updatedItemsAfterRemoval,
        totalAmount: updatedTotalAmountAfterRemoval,
      };
    default:
      throw new Error("Undefined Action !");
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
