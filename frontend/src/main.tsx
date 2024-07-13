import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"

import {NextUIProvider} from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemProvider } from "./components/theme-provider"
import Auth from "./pages/auth"
import Layout from "./components/layout"
import CurrentItem from "./pages/current-item"
import { Items } from "./pages/items"
import { Offers } from "./pages/offers"
import { Exchanges } from "./pages/exchanges"
import { UserProfile } from "./pages/user-profile"
import { AuthGuard } from "./features/user/authGuard"
import { UserProfileId } from "./components/user-profile-id"
import { MainPage } from "./pages/main"

const container = document.getElementById("root")

// router
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/items',
        element: <Items />
      },
      {
        path: '/offers',
        element: <Offers />
      },
      {
        path: '/exchanges',
        element: <Exchanges />
      },
      {
        path: '/user-profile',
        element: <UserProfile />
      },
      {
        path: '/users/:id',
        element: <UserProfileId />
      },
    ]
  },

]);

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemProvider>
            <AuthGuard>
              <RouterProvider router={ router }/>
            </AuthGuard>
          </ThemProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
