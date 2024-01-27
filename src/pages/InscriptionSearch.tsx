import { ErrorMessage } from "@hookform/error-message";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import validate from "bitcoin-address-validation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroller";
import { useLoaderData, useSubmit } from "react-router-dom";

import { OrdinalUtxo, Paginated } from "../api/types";
import { Button } from "../components/Button";
import { Header } from "../components/Headers";
import { Loading } from "../components/Loading";
import { Result } from "../components/Result";
import { Text } from "../components/Text";

const limit = 30;

export function InscriptionSearch() {
  const submit = useSubmit();
  const { bitcoinAddress } = useLoaderData() as {
    bitcoinAddress: string | undefined;
  };

  const {
    clearErrors,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    setFocus,
    trigger,
  } = useForm<{
    bitcoinAddress: string;
  }>({ reValidateMode: "onSubmit" });

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

      if (!response.ok) {
        throw new Error("Unable to fetch Ordinals");
      }

      return response.json();
    },
    enabled: validate(bitcoinAddress ?? ""),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + limit >= lastPage.total) return null;

      return lastPage.offset + limit;
    },
  });

  function onSubmit() {
    // setBitcoinAddress(getValues().bitcoinAddress);
    submit(getValues(), { method: "post" });
  }

  useEffect(() => {
    if (ordinalsQuery.isPending) setFocus("bitcoinAddress");

    if (bitcoinAddress) {
      setValue("bitcoinAddress", bitcoinAddress);
      trigger("bitcoinAddress");
    }
  }, []);

  return (
    <div className="flex max-h-full flex-col items-center">
      <Header>
        <Text>Ordinal Inscription Lookup</Text>
      </Header>

      <div className="pb-[10px]" />

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
          ordinalsQuery.isPending && <Loading />}

        {ordinalsQuery.fetchStatus === "idle" && ordinalsQuery.isError && (
          <Text className="text-center">
            Unable to fetch Ordinals. Try again later.
          </Text>
        )}

        {ordinalsQuery.status === "success" && bitcoinAddress && (
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
                loader={<Loading key="loading-more" />}
                useWindow={false}
              >
                {ordinalsQuery.data.pages.map((page) =>
                  page.results.map((utxo) =>
                    utxo.inscriptions.map((inscription) => (
                      <div key={inscription.id}>
                        <Result
                          bitcoinAddress={bitcoinAddress}
                          inscriptionId={inscription.id}
                        />
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
