import Loader from "react-loader-spinner";

import styles from "./Loader.module.css";

function CustomLoader() {
  return (
    <div className={styles.loader}>
      <Loader type="Circles" color="#00BFFF" height={150} width={150} />
    </div>
  );
}

export default CustomLoader;
