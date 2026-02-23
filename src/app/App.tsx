import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </AppProvider>
  );
}
