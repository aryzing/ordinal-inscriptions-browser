import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import { ErrorElement } from "./components/ErrorElement";
import "./index.css";
import { InscriptionDetails } from "./pages/InscriptionDetails";
import { loader as inscriptionDetailsLoader } from "./pages/InscriptionDetails/loader";
import { InscriptionSearch } from "./pages/InscriptionSearch";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/:bitcoinAddress?",
    element: <InscriptionSearch />,
    async loader({ params }) {
      return params;
    },
    async action({ request }) {
      const formData = await request.formData();
      const data = Object.fromEntries(formData.entries());
      return redirect(`/${data.bitcoinAddress}`);
    },
    errorElement: <ErrorElement />,
  },
  {
    path: "/:bitcoinAddress/:inscriptionId",
    element: <InscriptionDetails />,
    loader: inscriptionDetailsLoader(queryClient),
    errorElement: <ErrorElement />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen overflow-hidden bg-zinc-900 sm:py-8">
        <div className="flex max-h-full justify-center sm:h-full">
          <div className="max-h-full w-full max-w-[480px] sm:h-full sm:border sm:border-white">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
