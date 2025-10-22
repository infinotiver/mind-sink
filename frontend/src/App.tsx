import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import LoginPage from './app/LoginPage';
import HomePage from './app/HomePage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHomePage from './app/DashboardPage';
import BoardViewPage from './app/BoardViewPage';
import ItemViewPage from './app/ItemViewPage';
import ProfilePage from './app/ProfilePage';
// CreateBoardPage and AddItemPage removed in favor of dialog flows
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthProvider';
import AuthCallbackPage from './app/AuthCallbackPage';
import ManifestoPage from './app/ManifestoPage';
import { ShortcutsProvider } from './components/shortcuts/ShortcutsProvider';

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <HomePage />, // Redirect to homepage for missing routes
    },
    {
      path: '/manifesto',
      element: <ManifestoPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/auth/callback',
      element: <AuthCallbackPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardHomePage /> },
        { path: 'sink/:sinkID', element: <BoardViewPage /> },
        // create-sink route removed; creation is available via sidebar dialog
        { path: 'items/:itemID', element: <ItemViewPage /> },
        { path: 'favourites', element: <DashboardHomePage /> }, // Placeholder for "Favourites"
        // add-item route removed; add image is available via sidebar dialog
      ],
    },
    {
      path: '/users/:userID',
      element: <DashboardLayout />,
      children: [{ index: true, element: <ProfilePage /> }],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ShortcutsProvider>
            <RouterProvider router={router} />
          </ShortcutsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
