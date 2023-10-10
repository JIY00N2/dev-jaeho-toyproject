import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MainLayout from './Layout/MinLayout';
import SignUpPage from '../pages/SignUpPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID =
  '382921464283-7i13lqaj0skejg2oksn7gnsenuons90q.apps.googleusercontent.com';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
        <LoginPage />
      </GoogleOAuthProvider>
    ),
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
]);
