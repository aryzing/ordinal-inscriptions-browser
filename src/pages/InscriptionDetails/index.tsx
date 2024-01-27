import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";

import { H2 } from "../../components/Headers";

import { Attribute } from "./components/Attribute";
import { Detail } from "./components/Detail";
import { Header } from "./components/Header";
import { Preview } from "./components/Preview";
import { Title } from "./components/Title";
import { inscriptionMetadataQuery } from "./queries";
import { InscriptionMetadata } from "./types";
import { abbreviateLocation, abbreviateTxId } from "./utils";

export function InscriptionDetails() {
  const [initialData, { contentType, blob }] = useLoaderData() as [
    InscriptionMetadata,
    { contentType: string; blob: Blob },
  ];

  const params = useParams() as {
    bitcoinAddress: string;
    inscriptionId: string;
  };
  const metadataQuery = useQuery({
    ...inscriptionMetadataQuery(params),
    initialData,
  });

  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="min-h-0 grow overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="flex flex-col gap-y-6">
          <Preview contentType={contentType} blob={blob} />

          <div className="px-4">
            <Title number={metadataQuery.data.number} />

            <section className="flex flex-col gap-y-6 pb-12">
              <Detail name="Inscription ID" value={metadataQuery.data.id} />
              <Detail name="Owner Address" value={metadataQuery.data.address} />
            </section>

            <section>
              <div className="pb-8">
                <H2>Attributes</H2>
              </div>

              <div className="flex flex-col gap-6 pb-3">
                <Attribute
                  name="Output Value"
                  value={metadataQuery.data.value.toString()}
                />
                <Attribute
                  name="Content Type"
                  value={metadataQuery.data.content_type}
                />
                <Attribute
                  name="Content Length"
                  value={`${metadataQuery.data.content_length.toString()} bytes`}
                />
                <Attribute
                  name="Location"
                  value={abbreviateLocation(metadataQuery.data.location)}
                />
                <Attribute
                  name="Genesis Transaction"
                  value={abbreviateTxId(metadataQuery.data.genesis_tx_id)}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
