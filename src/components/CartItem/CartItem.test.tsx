import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "../../test-utils";
import { fakeProducts } from "../../test-utils/fake-data";
import CartItem from "./CartItem";

test("Cart item renders correctly", async () => {
  render(<CartItem item={fakeProducts[0]} />);

  const deleteBtns = screen.getAllByRole("button");

  expect(deleteBtns).toHaveLength(1);

  const deleteBtn = deleteBtns[0];

  expect(deleteBtn).toHaveClass("btnDelete");

  const deleteIcons = screen.getAllByRole("menuitem");

  expect(deleteIcons).toHaveLength(1);

  const deleteIcon = screen.getByRole("menuitem");

  expect(deleteIcon).toHaveClass("ri-delete-bin-6-line");

  userEvent.hover(deleteBtn);

  await waitFor(() => {
    expect(deleteIcon).toHaveClass("ri-delete-bin-6-fill");
  });

  userEvent.unhover(deleteBtn);
  await waitFor(() => {
    expect(deleteIcon).toHaveClass("ri-delete-bin-6-line");
  });

  const imageElement = screen.getByAltText("buy-product");

  expect(imageElement).toBeInTheDocument();

  expect(imageElement).toHaveAttribute("src", fakeProducts[0].url);

  const priceItem = screen.getByText(/5.99/i);

  expect(priceItem).toBeInTheDocument();
});
