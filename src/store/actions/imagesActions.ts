import { Item } from "../../types/sharedTypes";
import { Actions } from ".";

export const getImages = () => ({
  type: Actions.FETCH_IMAGES,
});

export const fetchImagesSuccess = (images: Item[]) => {
  return {
    type: Actions.FETCH_IMAGES_SUCCESS,
    payload: images,
  };
};

export const fetchImagesFail = (error: string) => {
  return {
    type: Actions.FETCH_IMAGES_FAIL,
    payload: error,
  };
};

export const isFavorite = (name: string) => {
  return {
    type: Actions.IS_FAVORITE,
    payload: name,
  };
};

export const willBuy = (name: string) => {
  return {
    type: Actions.WILL_BUY,
    payload: name,
  };
};

export const resetCart = () => {
  return {
    type: Actions.RESET_CART,
  };
};
