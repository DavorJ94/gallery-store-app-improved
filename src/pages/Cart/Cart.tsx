import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../../components/CartItem/CartItem";
import Header from "../../components/Header/Header";
import { resetCart } from "../../store/actions/imagesActions";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";

function Cart() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(({ images }: RootState) =>
    images.filter((image) => image.willBuy === true)
  );

  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = () => {
    setOrdering(true);
    setTimeout(() => {
      setOrderSuccess(true);
      setOrdering(false);
      setTimeout(() => {
        setOrderSuccess(false);
        dispatch(resetCart());
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <Header page="Cart" />
      <h1 className={styles.checkOut}>Check out</h1>
      <div
        className={styles.allItemsContainer}
        data-testid="cartItemsContainer"
      >
        {itemsInCart.map((item) => {
          return <CartItem item={item} disabled={ordering} key={item.id} />;
        })}
      </div>
      <div className={styles.messages}>
        <p className={styles.total}>
          Total:
          {itemsInCart.length === 0
            ? "$0.00"
            : `$${(itemsInCart.length * 5.99).toFixed(2)}`}
        </p>
        <h3 className={styles.noItemsMsg}>
          {itemsInCart.length === 0 ? "There are no items in cart." : ""}
        </h3>
      </div>
      {itemsInCart.length > 0 && !orderSuccess && (
        <button className={styles.orderBtn} onClick={handleOrder} type="submit">
          {ordering ? "Ordering..." : "Place Order"}
        </button>
      )}
      {orderSuccess && (
        <h2 className={styles.successfulMessage}>
          Order received successfully, thanks!
        </h2>
      )}
    </>
  );
}
export default Cart;
