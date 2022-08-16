import userEvent from "@testing-library/user-event";

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test-utils";
import {
  fakeFavoriteCartProducts,
  fakeProducts,
} from "../../test-utils/fake-data";
import Cart from "./Cart";

test("Cart renders products properly", async () => {
  render(<Cart />, {
    preloadedState: { images: fakeFavoriteCartProducts },
    routeHistory: ["/cart"],
  });

  const productsWrapper = await screen.findByTestId("cartItemsContainer");
  expect(productsWrapper).toBeInTheDocument();

  const products = screen.getAllByTestId("cartProduct");

  expect(products).toHaveLength(1);

  const headingCheckOut = screen.getByRole("heading", { name: /check out/i });

  expect(headingCheckOut).toBeInTheDocument();

  const total = screen.getByText(/total:/i);

  expect(total).toBeInTheDocument();

  expect(total).toHaveTextContent("Total:$5.99");

  const orderButton = screen.getByRole("button", { name: /place order/i });

  expect(orderButton).toBeInTheDocument();
});

test("Cart renders no products properly", async () => {
  render(<Cart />, {
    preloadedState: { images: fakeProducts },
    routeHistory: ["/cart"],
  });

  const productsWrapper = await screen.findByTestId("cartItemsContainer");
  expect(productsWrapper).toBeInTheDocument();

  const product = screen.queryByTestId("cartProduct");

  expect(product).not.toBeInTheDocument();

  const orderButton = screen.queryByRole("button", { name: /place order/i });

  expect(orderButton).not.toBeInTheDocument();

  const total = screen.getByText(/total:/i);

  expect(total).toBeInTheDocument();
  expect(total).toHaveTextContent("Total:$0.00");

  const noItemsMsg = screen.getByRole("heading", { name: /no items/i });

  expect(noItemsMsg).toBeInTheDocument();

  expect(noItemsMsg).toHaveTextContent("There are no items in cart.");
});

test("Cart handles order properly", async () => {
  jest.useFakeTimers();
  const { history } = render(<Cart />, {
    preloadedState: { images: fakeFavoriteCartProducts },
    routeHistory: ["/cart"],
  });

  const productsWrapper = await screen.findByTestId("cartItemsContainer");
  expect(productsWrapper).toBeInTheDocument();

  const products = screen.getAllByTestId("cartProduct");

  expect(products).toHaveLength(1);

  const orderButton = screen.getByRole("button", { name: /place order/i });

  expect(orderButton).toBeInTheDocument();

  userEvent.click(orderButton);

  await waitFor(() => {
    expect(orderButton).toHaveTextContent("Ordering...");
  });

  const total = screen.getByText(/total:/i);

  expect(total).toHaveTextContent("Total:$5.99");

  jest.advanceTimersByTime(2000);

  const successMessage = await screen.findByRole("heading", {
    name: /order received successfully/i,
  });

  expect(successMessage).toBeInTheDocument();

  await waitForElementToBeRemoved(successMessage, { timeout: 3000 });

  expect(total).toHaveTextContent("Total:$0.00");

  const noItemsMsg = screen.getByRole("heading", { name: /no items/i });

  expect(noItemsMsg).toBeInTheDocument();

  const backElement = screen.getByText(/continue shopping/i);
  expect(backElement).toBeInTheDocument();

  userEvent.click(backElement);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/");
  });

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
