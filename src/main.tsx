import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn.tsx";
import { Provider } from "react-redux";
import Otp from "./Pages/Auth/Otp.tsx";
import QrCode from "./Pages/Auth/QrCode.tsx";
import LayoutChat from "./Pages/Layout/LayoutChat.tsx";
import ChatGroup from "./Pages/Layout/Outlet/ChatGroup.tsx";
import Chat from "./Pages/Layout/Outlet/Chat.tsx";
import WelcomePage from "./Pages/Layout/Outlet/WelcomePage.tsx";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute.tsx";
import { store } from "./Redux/store.ts";
import CreateGroup from "./Pages/Layout/Sides/CreateGroup.tsx";
import Meet from "./Pages/Layout/Outlet/Meet.tsx";

import EditGroup from "./Pages/Layout/Sides/EditGroup.tsx";
const router = createBrowserRouter([


      {
        path: "/",
        element: <LayoutChat />,
        children: [
          {
            path: "/",
            element: <WelcomePage />,
          },
          {
            path: "chat",
            element: <Chat />,
            children: [
              {
                path: ":mobile",
                element: <Chat />,
              },
            ],
          },
          {
            path: "groups",
            element: <WelcomePage />,
            children: [
              {
                path: "groups",
                element: <ChatGroup />,
              },
            ],
          },
          {
            path: "groups/editgroup/:id",
            element: <EditGroup />,
          },
          {
            path: "addgroup",
            element: <CreateGroup />,
          },
          {
            path: "groups/:id",
            element: <ChatGroup />,
          },
          {
            path: "phonecalls",
            element: <WelcomePage />,
            children: [
              {
                path: "chat",
                element: <Chat />,
              },
            ],
          },

          {
            path: "meet",
            element: <Meet />,
          },
          {
            path: "/edit",
            element: <WelcomePage />,
          },
        ],
      },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/qr-code",
        element: <QrCode />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
