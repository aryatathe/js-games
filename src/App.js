import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { gameList } from "./_configs/game-list";

import Home from "./_Home";
import Error from "./_Error";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    ...gameList,
  ],
  { basename: "/js-games" },
);

const App = () => <RouterProvider router={router} />;

export default App;
