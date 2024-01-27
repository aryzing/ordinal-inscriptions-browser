import { InscriptionMetadata } from "./types";

export function inscriptionMetadataQuery({
  bitcoinAddress,
  inscriptionId,
}: {
  bitcoinAddress: string;
  inscriptionId: string;
}) {
  return {
    queryKey: ["inscription-metadata", bitcoinAddress, inscriptionId],
    queryFn: async () => {
      const response = await fetch(
        `https://api-3.xverse.app/v1/address/${bitcoinAddress}/ordinals/inscriptions/${inscriptionId}`,
      );

      if (!response.ok) {
        throw new Error("Unable to fetch inscription metadata");
      }

      return response.json() as Promise<InscriptionMetadata>;
    },
  };
}

export function inscriptionContentQuery(inscriptionId: string) {
  return {
    queryKey: ["inscription-content", inscriptionId],
    queryFn: async () => {
      const response = await fetch(
        `https://ord.xverse.app/content/${inscriptionId}`,
      );

      if (!response.ok) {
        throw new Error("Unable to fetch inscription content");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType) {
        throw new Error("Unable to determine inscription content-type");
      }

      return {
        contentType,
        blob: await response.blob(),
      };
    },
  };
}
