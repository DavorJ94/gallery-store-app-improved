import { useState } from "react";
import { useDispatch } from "react-redux";

import { willBuy } from "../../store/actions/imagesActions";
import { Item } from "../../types/sharedTypes";
import styles from "./CartItem.module.css";

type CartItemProps = {
  item: Item;
  disabled?: boolean;
};

function CartItem({ item, disabled = true }: CartItemProps) {
  const dispatch = useDispatch();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleDeleteItem = () => {
    dispatch(willBuy(item.id));
  };

  return (
    <div className={styles.itemContainer} data-testid="cartProduct">
      <div className={styles.binAndImage}>
        <button
          className={styles.btnDelete}
          name={item.id}
          onClick={!disabled ? handleDeleteItem : undefined}
          type="button"
          onMouseOver={() => setIsMouseOver(true)}
          onFocus={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <i
            role="menuitem"
            className={
              isMouseOver ? "ri-delete-bin-6-fill" : "ri-delete-bin-6-line"
            }
          />
        </button>
        <img className={styles.buyImg} src={item.url} alt="buy-product" />
      </div>
      <div>$5.99</div>
    </div>
  );
}

export default CartItem;
