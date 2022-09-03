import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartShown, setCartShown] = useState(false);

  const cartShowHandler = () => {
    setCartShown(true);
  };

  const cartHideHandler = () => {
    setCartShown(false);
  };
  return (
    <Fragment>
      {cartShown && <Cart onCloseClick={cartHideHandler} />}
      <Header onCartClick={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
