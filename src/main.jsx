import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LearnLoopAuth from "./Pages/Auth";
import NewsPage from "./Pages/News";
import Home from "./Pages/Home";
import PostForm from "./Components/PostForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LearnLoopAuth />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/news",
        element: <NewsPage />,
      },
      {
        path: "/home/",
        element: <PostForm />,
      },
    ],
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
