import { ReactNode } from "react";

import styles from "./ImagesLayout.module.css";

type ImageLayoutProps = {
  loading?: boolean;
  children: ReactNode;
};

function ImagesLayout({ loading = false, children }: ImageLayoutProps) {
  return (
    <div
      className={styles.gridContent}
      style={{ display: loading ? "none" : "grid" }}
      data-testid="imagesWrapper"
    >
      {children}
    </div>
  );
}

export default ImagesLayout;
