import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import HomeProduct from "../../components/ImageProduct/ImageProduct";
import ImagesLayout from "../../components/ImagesLayout/ImagesLayout";
import { RootState } from "../../store/store";
import styles from "./Favorites.module.css";

function Favorites() {
  const favoriteItems = useSelector((state: RootState) =>
    state.images.filter((image) => image.isFavorite)
  );

  return (
    <>
      <Header page="Favorites" />
      <h1 className={styles.favoritesHeader}>
        {favoriteItems.length === 0 ? "" : "Favorite images"}
      </h1>
      <ImagesLayout>
        {favoriteItems?.map((item) => {
          return <HomeProduct type="bin" item={item} key={item.id} />;
        })}
      </ImagesLayout>
      <h2 className={styles.noFavoritesMsg}>
        {favoriteItems.length === 0 ? "You have no favorite images." : ""}
      </h2>
    </>
  );
}
export default Favorites;
