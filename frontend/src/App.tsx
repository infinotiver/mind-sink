import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHomePage from "./app/DashboardPage";
import BoardViewPage from "./app/BoardViewPage";
import CreateBoardPage from "./app/CreateBoardPage";
import ItemViewPage from "./app/ItemViewPage";
import ProfilePage from "./app/ProfilePage";
import AddItemPage from "./app/AddItemPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <HomePage />, // Redirect to homepage for missing routes
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardHomePage /> },
        { path: "sink/:sinkID", element: <BoardViewPage /> },
        { path: "create-sink", element: <CreateBoardPage /> },
        { path: "items/:itemID", element: <ItemViewPage /> },
        { path: "all", element: <DashboardHomePage /> }, // Placeholder for "View Sinks"
        { path: "favourites", element: <DashboardHomePage /> }, // Placeholder for "Favourites"
        { path: "add-item", element: <AddItemPage /> }, // Placeholder for "Add Image"
      ],
    },
    {
      path: "/users/:userID",
      element: <DashboardLayout />,
      children: [{ index: true, element: <ProfilePage /> }],
    },
  ]);


  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>

  );
}

export default App;
