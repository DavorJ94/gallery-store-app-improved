import { Item } from "../../types/sharedTypes";

export enum Actions {
  FETCH_IMAGES = "FETCH_IMAGES",
  FETCH_IMAGES_SUCCESS = "FETCH_IMAGES_SUCCESS",
  FETCH_IMAGES_FAIL = "FETCH_IMAGES_FAIL",
  IS_FAVORITE = "IS_FAVORITE",
  WILL_BUY = "WILL_BUY",
  RESET_CART = "RESET_CART",
}

type ActionTypeWithArray = {
  type: string;
  payload: Item[];
};

type ActionTypeWithString = {
  type: string;
  payload?: string;
};

export type ActionTypes = ActionTypeWithArray | ActionTypeWithString;
