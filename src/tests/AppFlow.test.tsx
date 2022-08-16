import userEvent from "@testing-library/user-event";

import App from "../App";
import { getAllByRole, render, screen, waitFor } from "../test-utils";

test("Homepage works as expected", async () => {
  const { history } = render(<App />, { routeHistory: ["/"] });

  // Header
  const headerElement = screen.getByRole("banner");
  const headerButtonElements = getAllByRole(headerElement, "button");
  const headerFavoriteBtn = headerButtonElements[0];
  const headerCartBtn = headerButtonElements[1];

  // Homepage
  const imageProducts = await screen.findAllByTestId("imageProduct");
  expect(imageProducts).toHaveLength(2);

  const firstImageProduct = imageProducts[0];
  const secondImageProduct = imageProducts[1];

  const firstElemButtonItems = getAllByRole(firstImageProduct, "button", {
    hidden: true,
  });

  const secondElemButtonItems = getAllByRole(secondImageProduct, "button", {
    hidden: true,
  });

  const firstElementCartBtn = firstElemButtonItems[0];
  const secondElementCartBtn = secondElemButtonItems[0];

  expect(headerFavoriteBtn).toHaveAttribute("data-favorite-count", "0");
  expect(headerCartBtn).toHaveAttribute("data-willbuy-count", "0");

  userEvent.click(firstElementCartBtn);

  await waitFor(() => {
    expect(headerFavoriteBtn).toHaveAttribute("data-favorite-count", "0");
    expect(headerCartBtn).toHaveAttribute("data-willbuy-count", "1");
  });

  userEvent.click(secondElementCartBtn);

  await waitFor(() => {
    expect(headerFavoriteBtn).toHaveAttribute("data-favorite-count", "0");
    expect(headerCartBtn).toHaveAttribute("data-willbuy-count", "2");
  });

  userEvent.click(headerCartBtn.closest("a") as HTMLAnchorElement);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/cart");
  });
});
