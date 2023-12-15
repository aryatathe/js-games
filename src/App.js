import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { gameList } from "./_configs/game-list";

import Home from "./_Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    ...gameList,
  ],
  { baseName: "/js-games/" },
);

const App = () => <RouterProvider router={router} />;

export default App;
