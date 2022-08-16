import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import { Item } from "../../types/sharedTypes";
import styles from "./Header.module.css";

type HeaderProps = {
  images?: Item[];
  page?: string;
};

function Header({ images = [], page = "" }: HeaderProps) {
  const checkFavoriteAndWillBuy = () => {
    let favCounter = 0;
    let willBuyCounter = 0;

    images?.forEach((image) => {
      if (image.isFavorite) favCounter += 1;
      if (image.willBuy) willBuyCounter += 1;
    });
    return { favoritesCount: favCounter, willBuyCount: willBuyCounter };
  };

  return (
    <header className={styles.header}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>

      {page === "Home" ? (
        <div className={styles.favCartContainer}>
          <Link to="/favorites" style={{ textDecoration: "none" }}>
            <button
              className={`${styles.headerBtn} ${styles.favoritesBtn}`}
              data-favorite-count={checkFavoriteAndWillBuy().favoritesCount}
              type="button"
            >
              <i
                role="menuitem"
                className={
                  checkFavoriteAndWillBuy().favoritesCount !== 0
                    ? "ri-heart-3-fill"
                    : "ri-heart-3-line"
                }
              />
            </button>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button
              className={`${styles.headerBtn} ${styles.willBuyBtn}`}
              data-willbuy-count={checkFavoriteAndWillBuy().willBuyCount}
              type="button"
            >
              <i
                role="menuitem"
                className={
                  checkFavoriteAndWillBuy().willBuyCount !== 0
                    ? "ri-shopping-cart-2-fill"
                    : "ri-shopping-cart-2-line"
                }
              />
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/" style={{ textDecoration: "none" }}>
          <div role="button" className={styles.backToShopping}>
            <i role="menuitem" className="ri-arrow-left-s-fill" />
            Continue shopping
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
