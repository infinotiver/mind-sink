import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./app/Login";
import HomePage from "./app/HomePage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHomePage from "./app/Dashboard";
import BoardView from "./app/BoardView";
import CreateBoard from "./app/CreateBoard";
import ItemView from "./app/ItemView";
import ProfilePage from "./app/ProfilePage";
import AddItemPage from "./app/AddItemPage";
import { fetchData } from "./utils/apiHandler"; // Import API handler

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
        { path: "sink/:sinkID", element: <BoardView /> },
        { path: "create-sink", element: <CreateBoard /> },
        { path: "items/:itemID", element: <ItemView /> },
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

  // Example usage of fetchData
  async function loadDashboardData() {
    const data = await fetchData("/api/dashboard");
    console.log("Dashboard Data:", data);
  }

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>

  );
}

export default App;
