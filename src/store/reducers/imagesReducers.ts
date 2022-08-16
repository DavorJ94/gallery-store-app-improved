import { Item } from "../../types/sharedTypes";
import { Actions, ActionTypes } from "../actions";

const initialState: Item[] = [];

function allImages(state: Item[] = initialState, action: ActionTypes): Item[] {
  switch (action.type) {
    case Actions.FETCH_IMAGES_SUCCESS: {
      if (action.payload instanceof Array) return action.payload;
      return [];
    }
    case Actions.IS_FAVORITE: {
      const newObj = state.map((image) => {
        if (image.id === action.payload) {
          return { ...image, isFavorite: !image.isFavorite };
        }
        return image;
      });
      return newObj;
    }
    case Actions.WILL_BUY:
      return state.map((image) => {
        if (image.id === action.payload) {
          return { ...image, willBuy: !image.willBuy };
        }
        return image;
      });
    case Actions.RESET_CART:
      return state.map((image) => {
        return { ...image, willBuy: false };
      });
    default:
      return state;
  }
}

export default allImages;
