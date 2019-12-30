# Foodie - React Web

Foodie is a demo application for finding restaurants using Yelp's GraphQL API.
We have built it on several tech stacks in order to compare and contrast
technologies. This one is built on:

-   React
-   Material-UI
-   React Apollo Client

You can try out the live version
[here](https://foodie-react-web.firebaseapp.com/).

![Screen Shot](assets/screenshot.png)

## Build

-   Install dependencies

```bash
yarn
```

-   Create env.js

```bash
cp config/env.js public/env.js
```

Now edit `public/env.js` and enter your Yelp access token as the value of
ACCESS_TOKEN

-   Start the Foodie app

```bash
yarn start
```

Now point your browser to http://localhost:3000/.
