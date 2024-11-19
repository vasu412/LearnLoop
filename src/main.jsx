import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LearnLoopAuth from "./Pages/Auth";
import NewsPage from "./Pages/News";
import PostForm from "./Components/PostForm";
import TeachingResources from "./Pages/TeachingResources";
import CalendarEvents from "./Pages/EventPage";
import PostDetail from "./Components/PostDetail";
import FeatureWishlist from "./Pages/FeatureWishlist";
import App from "./Pages/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LearnLoopAuth />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home/news",
        element: <NewsPage />,
      },
      {
        path: "/home/",
        element: <PostForm />,
      },
      {
        path: "/home/resources",
        element: <TeachingResources />,
      },
      {
        path: "/home/events",
        element: <CalendarEvents />,
      },
      {
        path: "/home/wishlist",
        element: <FeatureWishlist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
