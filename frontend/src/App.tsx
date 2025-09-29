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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import AuthCallbackPage from "./app/AuthCallbackPage";
import ViewSinksPage from "./app/ViewSinksPage";
import ManifestoPage from "./app/ManifestoPage";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <HomePage />, // Redirect to homepage for missing routes
    },
    {
      path: "/manifesto",
      element: <ManifestoPage/>
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/callback",
      element: <AuthCallbackPage/>,  
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardHomePage /> },
        { path: "sink/:sinkID", element: <BoardViewPage /> },
        { path: "create-sink", element: <CreateBoardPage /> },
        { path: "items/:itemID", element: <ItemViewPage /> },
        { path: "all", element: <ViewSinksPage /> }, // Placeholder for "View Sinks"
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
