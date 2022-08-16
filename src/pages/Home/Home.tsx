import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import HomeProduct from "../../components/ImageProduct/ImageProduct";
import ImagesLayout from "../../components/ImagesLayout/ImagesLayout";
import CustomLoader from "../../components/Loader/Loader";
import { getImages } from "../../store/actions/imagesActions";
import { RootState } from "../../store/store";

let timeoutConst: NodeJS.Timeout;

function HomePage() {
  const dispatch = useDispatch();
  const { images } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutConst);
    };
  });

  useEffect(() => {
    if (images.length > 0) {
      timeoutConst = setTimeout(() => setLoading(false), 1000);
    } else {
      setLoading(true);
      dispatch(getImages());
    }
  }, [dispatch, images]);

  return (
    <>
      <Header images={images} page="Home" />
      {loading && <CustomLoader />}
      <ImagesLayout loading={loading}>
        {images?.map((item) => {
          return <HomeProduct item={item} key={item.id} />;
        })}
      </ImagesLayout>
    </>
  );
}

export default HomePage;
