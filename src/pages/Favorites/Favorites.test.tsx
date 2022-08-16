import userEvent from "@testing-library/user-event";

import {
  findAllByAltText,
  getAllByRole,
  queryAllByAltText,
  queryByRole,
  render,
  screen,
  waitFor,
} from "../../test-utils";
import {
  fakeFavoriteCartProducts,
  fakeProducts,
} from "../../test-utils/fake-data";
import Favorites from "./Favorites";

test("Favorites renders properly when there are favorite images", async () => {
  render(<Favorites />, {
    preloadedState: { images: fakeFavoriteCartProducts },
    routeHistory: ["/favorites"],
  });

  const imagesWrapper = screen.getByTestId("imagesWrapper");
  const images = await findAllByAltText(imagesWrapper, "product");
  expect(images).toHaveLength(2);

  expect(images[0]).toHaveAttribute("src", fakeFavoriteCartProducts[0].url);

  const deleteFavBtns = screen.getAllByTestId("deleteFavBtn");

  expect(deleteFavBtns).toHaveLength(2);

  const deleteFavBtn = deleteFavBtns[0];

  userEvent.click(deleteFavBtn);

  await waitFor(() => {
    const deleteFavBtnsWithoutDeleted = screen.getAllByTestId("deleteFavBtn");
    expect(deleteFavBtnsWithoutDeleted).toHaveLength(1);
  });

  const binIcons = getAllByRole(imagesWrapper, "menuitem");

  expect(binIcons).toHaveLength(1);

  expect(binIcons[0]).toHaveAttribute("class", "ri-delete-bin-6-line");
});

test("Favorites section displays message when no favorite images are left", async () => {
  const { history } = render(<Favorites />, {
    preloadedState: { images: fakeProducts },
    routeHistory: ["/favorites"],
  });
  const imagesWrapper = screen.getByTestId("imagesWrapper");
  const images = queryAllByAltText(imagesWrapper, "product");
  expect(images).toHaveLength(0);

  const binIcon = queryByRole(imagesWrapper, "menuitem");

  expect(binIcon).not.toBeInTheDocument();

  const noImagesMessage = screen.getByRole("heading", {
    level: 2,
    name: /you have no favorite images/i,
  });

  expect(noImagesMessage).toBeInTheDocument();

  const backElement = screen.getByText(/continue shopping/i);
  expect(backElement).toBeInTheDocument();

  userEvent.click(backElement);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/");
  });
});
