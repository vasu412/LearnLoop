import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LearnLoopAuth from "./Pages/Auth";
import NewsPage from "./Pages/News";
import PostForm from "./Components/PostForm";
import CalendarEvents from "./Pages/EventPage";
import FeatureWishlist from "./Pages/FeatureWishlist";
import App from "./Pages/App";
import LessonPlans from "./Pages/LessonPlans";
import Websites from "./Pages/Websites";
import Coursebooks from "./Pages/CourseBooks";
import PostPreview from "./Components/PreviewPost";
import TutorChatRoom from "./Pages/TutorChatRoom";
import TeachingQuestions from "./Pages/TeachingQuestions";
import OnboardingPage from "./Pages/OnboardingPage";
import UserSettings from "./Pages/UserSettings";
import Bookmarks from "./Components/Bookmark";

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
        path: "/home/lesson-plans",
        element: <LessonPlans />,
      },
      {
        path: "/home/websites",
        element: <Websites />,
      },
      {
        path: "/home/coursebooks",
        element: <Coursebooks />,
      },
      {
        path: "/home/events",
        element: <CalendarEvents />,
      },
      {
        path: "/home/wishlist",
        element: <FeatureWishlist />,
      },
      {
        path: "/home/postpreview/:id",
        element: <PostPreview />,
      },
      {
        path: "/home/tutorChatRoom",
        element: <TutorChatRoom />,
      },
      {
        path: "/home/questionsandtips",
        element: <TeachingQuestions />,
      },
      {
        path: "/home/onboardingPage",
        element: <OnboardingPage />,
      },
      {
        path: "/home/usersettings",
        element: <UserSettings />,
      },
      {
        path: "/home/bookmarks",
        element: <Bookmarks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
