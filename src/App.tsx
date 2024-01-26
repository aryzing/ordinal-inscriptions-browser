import { ErrorMessage } from "@hookform/error-message";
import {
  InfiniteData,
  QueryClient,
  QueryClientProvider,
  QueryKey,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import validate from "bitcoin-address-validation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroller";
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";

import { OrdinalUtxo, Paginated } from "./api/types";
import { Button } from "./components/Button";
import { Header } from "./components/Headers";
import { Result } from "./components/Result";
import { Text } from "./components/Text";
import "./index.css";

function InscriptionLookup() {
  const {
    clearErrors,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    bitcoinAddress: string;
  }>({ reValidateMode: "onSubmit" });

  const limit = 15;
  const [bitcoinAddress, setBitcoinAddress] = useState<string | null>(null);

  const ordinalsQuery = useInfiniteQuery<
    Paginated<OrdinalUtxo>,
    Error,
    InfiniteData<Paginated<OrdinalUtxo>>,
    QueryKey,
    number
  >({
    queryKey: ["ordinals", bitcoinAddress],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://api-3.xverse.app/v1/address/${bitcoinAddress}/ordinal-utxo?limit=${limit}&offset=${pageParam}`,
      );

      return response.json();
    },
    enabled: bitcoinAddress !== null,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + limit >= lastPage.total) return null;

      return lastPage.offset + limit;
    },
  });

  function onSubmit() {
    setBitcoinAddress(getValues().bitcoinAddress);
  }

  const total =
    ordinalsQuery.data?.pages[ordinalsQuery.data.pages.length - 1].total ?? 0;

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      "input[name=bitcoinAddress]",
    );
    input?.focus();
  }, []);

  return (
    <div className="flex max-h-full flex-col items-center">
      <div className="pb-8" />

      <Header>Ordinal Inscription Lookup</Header>

      <div className="pb-8" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col px-4 "
      >
        <label>
          <Text>Owner Bitcoin Address:</Text>

          <div className="pb-3.5" />

          <input
            {...register("bitcoinAddress", {
              onChange() {
                clearErrors("bitcoinAddress");
              },
              validate(value) {
                if (!value) {
                  return "Bitcoin Address is required";
                }

                if (!validate(value)) {
                  return "Invalid Bitcoin address";
                }

                return true;
              },
            })}
            className="h-8 w-full bg-zinc-800 px-1 text-white"
            autoComplete="off"
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="bitcoinAddress"
          render={({ message }) => (
            <>
              <div className="pb-1" />
              <Text className="text-red-500">{message}</Text>
            </>
          )}
        />

        <div className="pb-2.5" />

        <Button
          disabled={
            (ordinalsQuery.fetchStatus === "fetching" ||
              bitcoinAddress === getValues().bitcoinAddress) &&
            !(
              ordinalsQuery.fetchStatus === "fetching" &&
              bitcoinAddress !== getValues().bitcoinAddress
            )
          }
        >
          Look up
        </Button>
      </form>

      <div className="pb-5" />

      <div className="flex min-h-0 w-full grow flex-col px-4">
        {ordinalsQuery.fetchStatus === "fetching" &&
          ordinalsQuery.isPending && (
            <Text className="text-center">Loading...</Text>
          )}

        {ordinalsQuery.fetchStatus === "idle" && ordinalsQuery.isError && (
          <Text className="text-center">
            Unable to fetch Ordinals. Try again later.
          </Text>
        )}

        {ordinalsQuery.status === "success" && (
          <>
            <div
              id="infinite-scroll-container"
              className="flex min-h-0 grow flex-col gap-y-4 overflow-y-auto no-scrollbar"
            >
              <InfiniteScroll
                loadMore={() => {
                  if (ordinalsQuery.isFetchingNextPage) return;
                  ordinalsQuery.fetchNextPage();
                }}
                hasMore={ordinalsQuery.hasNextPage}
                loader={
                  <Text key="loading-message" className="text-center">
                    Loading...
                  </Text>
                }
                useWindow={false}
              >
                {ordinalsQuery.data.pages.map((page) =>
                  page.results.map((utxo) =>
                    utxo.inscriptions.map((inscription) => (
                      <div key={inscription.id}>
                        <Result id={inscription.id} />
                      </div>
                    )),
                  ),
                )}
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>

      <div className="pb-2" />
    </div>
  );
}

function Inscription() {
  const { id } = useParams<{ id: string }>();
  const inscriptionQuery = useQuery({
    queryKey: ["inscription", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api-3.xverse.app/v1/${bitcoinAddress}/ordinals/inscriptions/${id}`,
      );

      return response.json();
    },
  });

  return <div>Inscription</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <InscriptionLookup />,
    errorElement: (
      <Text className="text-center">404: This page doesn't exist.</Text>
    ),
  },
  {
    path: "/inscription/:id",
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen overflow-hidden bg-zinc-900 py-8">
        <div className="flex max-h-full justify-center">
          <div className="max-h-full w-full max-w-[480px] border border-white">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
