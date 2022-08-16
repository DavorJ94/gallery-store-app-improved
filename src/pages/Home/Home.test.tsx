import { findAllByAltText, render, screen } from "../../test-utils";
import Home from "./Home";

test("Homepage displays images properly", async () => {
  render(<Home />);

  const imagesWrapper = screen.getByTestId("imagesWrapper");

  const images = await findAllByAltText(imagesWrapper, "product");
  expect(images).toHaveLength(2);

  expect(images[0]).toHaveAttribute(
    "src",
    "https://github.com/bobziroll/scrimba-react-bootcamp-images/blob/master/pic1.jpg?raw=true"
  );
});
