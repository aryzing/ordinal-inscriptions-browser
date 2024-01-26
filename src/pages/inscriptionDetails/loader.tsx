import { QueryClient } from "@tanstack/react-query";
import { Params, redirect } from "react-router-dom";

import { inscriptionContentQuery, inscriptionMetadataQuery } from "./queries";

export function loader(queryClient: QueryClient) {
  return async ({
    params,
  }: {
    params: Params<"bitcoinAddress" | "inscriptionId">;
  }) => {
    const { bitcoinAddress, inscriptionId } = params;

    if (!bitcoinAddress || !inscriptionId) {
      return redirect("/");
    }

    return Promise.all([
      queryClient.ensureQueryData(
        inscriptionMetadataQuery({ bitcoinAddress, inscriptionId }),
      ),
      queryClient.ensureQueryData(inscriptionContentQuery(inscriptionId)),
    ]);
  };
}
