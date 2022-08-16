import userEvent from "@testing-library/user-event";

import logo from "../../assets/logo.png";
import { render, screen, waitFor } from "../../test-utils";
import {
  fakeFavoriteCartProducts,
  fakeProducts,
} from "../../test-utils/fake-data";
import Header from "./Header";

test("Header renders correctly in home page", () => {
  render(<Header images={fakeProducts} page="Home" />);

  const imageElement = screen.getByAltText("logo");
  expect(imageElement).toBeInTheDocument();

  expect(imageElement).toHaveAttribute("src", logo);

  const buttonElements = screen.getAllByRole("button");

  expect(buttonElements).toHaveLength(2);

  buttonElements.forEach((buttonElement) => {
    expect(buttonElement).toBeInTheDocument();
  });

  expect(buttonElements[0]).toHaveAttribute("data-favorite-count", "0");
  expect(buttonElements[1]).toHaveAttribute("data-willbuy-count", "0");

  const iconElements = screen.getAllByRole("menuitem");

  expect(iconElements).toHaveLength(2);

  iconElements.forEach((iconElement) => {
    expect(iconElement).toBeInTheDocument();
  });
});

test("Header renders correctly in favorite and cart page", () => {
  render(<Header images={fakeProducts} />);

  const imageElement = screen.getByAltText("logo");
  expect(imageElement).toBeInTheDocument();

  expect(imageElement).toHaveAttribute("src", logo);

  const buttonElement = screen.queryByRole("button", {
    name: /continue shopping/i,
  });

  expect(buttonElement).toBeInTheDocument();

  const iconElements = screen.getAllByRole("menuitem");

  expect(iconElements).toHaveLength(1);
});

test("Header renders correctly favorites and cart count", () => {
  render(<Header images={fakeFavoriteCartProducts} page="Home" />);

  const buttonElements = screen.getAllByRole("button");

  expect(buttonElements).toHaveLength(2);

  buttonElements.forEach((buttonElement) => {
    expect(buttonElement).toBeInTheDocument();
  });

  expect(buttonElements[0]).toHaveAttribute("data-favorite-count", "2");
  expect(buttonElements[1]).toHaveAttribute("data-willbuy-count", "1");

  const iconElements = screen.getAllByRole("menuitem");

  expect(iconElements).toHaveLength(2);

  iconElements.forEach((iconElement) => {
    expect(iconElement).toBeInTheDocument();
  });
});

test("Header redirects properly from home page", async () => {
  const { history } = render(<Header images={fakeProducts} page="Home" />, {
    routeHistory: ["/"],
  });

  const anchorElements = screen.getAllByRole("link");

  userEvent.click(anchorElements[1]);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/favorites");
  });

  userEvent.click(anchorElements[2]);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/cart");
  });

  userEvent.click(anchorElements[0]);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/");
  });
});

test("Header redirects to homepage using logo", () => {
  const { history } = render(<Header images={fakeProducts} />, {
    routeHistory: ["/cart"],
  });

  const imageElement = screen.getByAltText("logo");
  expect(imageElement).toBeInTheDocument();

  expect(imageElement).toHaveAttribute("src", logo);

  userEvent.click(imageElement);

  waitFor(() => {
    expect(history.location.pathname).toBe("/");
  });
});

test("Header redirects to homepage using 'continue shopping'", async () => {
  const { history } = render(<Header images={fakeProducts} />, {
    routeHistory: ["/cart"],
  });

  const backElement = screen.getByText(/continue shopping/i);
  expect(backElement).toBeInTheDocument();

  userEvent.click(backElement);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/");
  });
});
