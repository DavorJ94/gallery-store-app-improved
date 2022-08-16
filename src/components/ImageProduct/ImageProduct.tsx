import { useDispatch } from "react-redux";

import { isFavorite, willBuy } from "../../store/actions/imagesActions";
import { Item } from "../../types/sharedTypes";
import styles from "./ImageProduct.module.css";

type ImageProductProps = {
  type?: string;
  item: Item;
};

function ImageProduct({ item, type = "" }: ImageProductProps) {
  const dispatch = useDispatch();

  const handleClassName = (currItem: Item) => {
    if (type === "bin") return styles.default;
    if (currItem.isFavorite && currItem.willBuy) return styles.willBuyFavorite;
    if (currItem.isFavorite) return styles.isFavorite;
    if (currItem.willBuy) return styles.willBuy;
    return styles.default;
  };

  const handleFavButtonClick = () => {
    dispatch(isFavorite(item.id));
  };

  const handleWillBuyBtn = () => {
    dispatch(willBuy(item.id));
  };

  return (
    <div className={handleClassName(item)} data-testid="imageProduct">
      <div className={styles.imgContainer}>
        <img src={item.url} alt="product" className={styles.image} />
      </div>
      {type !== "bin" && (
        <div className={styles.btnContainer}>
          <button
            className={styles.cartBtn}
            onClick={handleWillBuyBtn}
            type="button"
          >
            <i
              className={
                item.willBuy
                  ? `ri-shopping-cart-2-fill ${styles.checkedCart}`
                  : "ri-shopping-cart-2-line"
              }
              role="menuitem"
            />
          </button>
          <button
            className={styles.favoriteBtn}
            onClick={handleFavButtonClick}
            type="button"
          >
            <i
              className={
                item.isFavorite
                  ? `ri-heart-3-fill ${styles.checkedFav}`
                  : "ri-heart-3-line"
              }
              role="menuitem"
            />
          </button>
        </div>
      )}
      {type === "bin" && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          data-testid="deleteFavBtn"
          className={styles.deleteFavBtn}
          onClick={handleFavButtonClick}
        >
          <i role="menuitem" className="ri-delete-bin-6-line" />
        </div>
      )}
    </div>
  );
}

export default ImageProduct;
