# Gallery store app created in React/Redux

## Improved previous project of gallery store app

### Now the project is written in:

- React@18,
- React router v6,
- Redux Saga (for api calls and managing state),
- Added Typescript for type checking,
- Added testing with Jest and RTL,
- Added linting rules for better control of the project,
- Overall refactoring of folder structure for better readability

#### Previous text from older version of the project: [gallery-store-app-react-redux](https://github.com/DavorJ94/gallery-store-app-react-redux)

Improved gallery store with utilization of Redux state management (wanted to avoid local storage for this app, even tho it would be appropriate and most likely easier to use in this case). Main goal for this app was to get familiarized with Redux state management (actions, reducers, middleware,, selectors and overall state behavior with routing).

Images are taken from an api call ("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json").

There is also routing in this app. User is allowed to add items to cart, as well as to add items to favorites list.

There is page that allows users to see the items that are marked as favorite, and also have the option to delete those items from the list (on the same page) for improved control (UX).

There is page that lists all items added to cart, their individual price, as well as calculated total in USD. There is also an option to delete the items from the cart on the same page. Total and items that remain in cart are updated live.

When user clicks on the button "Place order" which is on the check out page, mock ordering message is displayed, as well as successful message. Basically it is just timed out for two seconds to simulate real conditions when placing an order.

In home page, list of all items received from an api call are displayed. There are icons on that page that show how many items are marked as favorite or sent to cart. Icons for the whole website are taken from open source icon database https://remixicon.com/.
