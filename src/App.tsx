import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "./components/Button";
import { Header } from "./components/Headers";
import { Result } from "./components/Result";
import { Text } from "./components/Text";
import "./index.css";

function InscriptionLookup() {
  const { register, handleSubmit, getValues } = useForm<{
    bitcoinAddress: string;
  }>();

  const ordinalQuery = useQuery({
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
    <div className="flex flex-col items-center">
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

      <div className="w-full px-4">
        <Text>Results</Text>

        <div className="pb-6" />

        <div className="flex flex-col gap-y-4 ">
          <Result id="12345678" />
          <Result id="qwertyui" />
          <Result id="asdfghjk" />
        </div>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-zinc-900">
        <div className="mx-auto w-full max-w-[480px] border border-white py-12">
          <InscriptionLookup />
        </div>
      </div>
    </QueryClientProvider>
  );
}
