import { render, screen } from "../../test-utils";
import ImageProduct from "./ImageProduct";

const fakeFavoriteItem = {
  url: "https://github.com/bobziroll/scrimba-react-bootcamp-images/blob/master/pic1.jpg?raw=true",
  id: "1",
  isFavorite: true,
  willBuy: false,
};

test("product item renders in favorites properly", () => {
  render(<ImageProduct item={fakeFavoriteItem} type="bin" />);

  const image = screen.getByAltText("product");

  expect(image).toHaveAttribute("src", fakeFavoriteItem.url);

  const buttonItem = screen.getByTestId("deleteFavBtn");

  expect(buttonItem).toBeInTheDocument();
});

test("product item renders favorite item in home page properly", () => {
  render(<ImageProduct item={fakeFavoriteItem} />);

  const image = screen.getByAltText("product");

  expect(image).toHaveAttribute("src", fakeFavoriteItem.url);

  const buttonItems = screen.getAllByRole("button");

  expect(buttonItems).toHaveLength(2);

  expect(buttonItems[1]).toHaveClass("favoriteBtn");
  expect(buttonItems[0]).toHaveClass("cartBtn");

  const iconItems = screen.getAllByRole("menuitem");

  expect(iconItems).toHaveLength(2);

  expect(iconItems[0]).toHaveClass("ri-shopping-cart-2-line");
  expect(iconItems[1]).toHaveClass("ri-heart-3-fill");
});
