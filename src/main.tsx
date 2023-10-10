import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Profile, Generator, Records } from "./routes";
import "./index.css";
import ErrorPage from "./error-page";
import {
  profilePageLoader,
  generatorPageLoader,
  recordsPageLoader,
} from "./data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
    errorElement: <ErrorPage />,
    loader: profilePageLoader,
  },
  {
    path: "/generator/:jobPostId",
    element: <Generator />,
    loader: generatorPageLoader,
  },
  {
    path: "/records",
    element: <Records />,
    loader: recordsPageLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
