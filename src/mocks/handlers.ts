import { rest } from "msw";

import { URL } from "../data/constants";
import { fakeProducts } from "../test-utils/fake-data";

export const handlers = [
  rest.get(URL, (_, res, ctx) => {
    return res(ctx.json(fakeProducts));
  }),
];
