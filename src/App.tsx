import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useForm } from "react-hook-form";

import { OrdinalUtxo, Paginated } from "./api/types";
import { Button } from "./components/Button";
import { Header } from "./components/Headers";
import { Result } from "./components/Result";
import { Text } from "./components/Text";
import "./index.css";

function InscriptionLookup() {
  const { register, handleSubmit, getValues } = useForm<{
    bitcoinAddress: string;
  }>();

  const ordinalQuery = useQuery<Paginated<OrdinalUtxo>>({
    queryKey: ["ordinals"],
    queryFn: async () => {
      const { bitcoinAddress } = getValues();
      const response = await fetch(
        `https://api-3.xverse.app/v1/address/${bitcoinAddress}/ordinal-utxo`,
      );
      return response.json();
    },
    enabled: false,
  });

  function onSubmit() {
    ordinalQuery.refetch();
  }

  console.log("Rendering");

  return (
    <div className="flex max-h-full flex-col items-center">
      <Header>Ordinal Inscription Lookup</Header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col px-4 pt-8"
      >
        <label>
          <Text>Owner Bitcoin Address:</Text>

          <div className="pb-3.5" />

          <input
            {...register("bitcoinAddress")}
            className="h-8 w-full bg-zinc-800 px-1 text-white"
          />
        </label>

        <div className="pb-2.5" />

        <Button>Look up</Button>
      </form>

      <div className="pb-5" />

      <div className="flex min-h-0 w-full grow flex-col px-4">
        <Text>Results</Text>

        <div className="pb-6" />

        <div className="flex min-h-0 grow flex-col gap-y-4 overflow-scroll border border-red-500">
          {ordinalQuery.data?.results.map((utxo) =>
            utxo.inscriptions.map((inscription) => (
              <div className="w-full shrink-0">
                <Result key={inscription.id} id={inscription.id.slice(0, 8)} />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen overflow-hidden bg-zinc-900">
        <div className="flex max-h-full justify-center">
          <div className="max-h-full w-full max-w-[480px] border border-white py-12">
            <InscriptionLookup />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
