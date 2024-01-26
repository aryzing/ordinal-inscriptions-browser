import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import { DetailHeader, H1, Header } from "../components/Headers";
import { Hr } from "../components/Hr";
import { Text } from "../components/Text";
import { ChevronLeft } from "../icons/ChevronLeft";

import { loader } from "./inscriptionDetails/loader";
import { inscriptionMetadataQuery } from "./inscriptionDetails/queries";
import { InscriptionMetadata } from "./inscriptionDetails/types";

function switchContentType(
  contentType: string,
  opts: {
    image: React.ReactNode;
    text: React.ReactNode;
    rest: React.ReactNode;
  },
) {
  if (contentType.startsWith("image/")) {
    return opts.image;
  }
  if (contentType.startsWith("text/")) {
    return opts.text;
  }
  return opts.rest;
}

interface Props {
  contentType: string;
  blob: Blob;
}
export function Preview({ contentType, blob }: Props) {
  const [text, setText] = React.useState<string | null>(null);
  useEffect(() => {
    if (contentType.startsWith("text/")) {
      blob.text().then(setText);
    }
  });

  return switchContentType(contentType, {
    image: (
      <img className="aspect-square w-full" src={URL.createObjectURL(blob)} />
    ),
    text: (
      <div className="aspect-square w-full bg-zinc-800 p-2">
        <pre className="aspect-square w-full overflow-hidden text-white">
          {text}
        </pre>
      </div>
    ),
    rest: (
      <Text>
        Preview of ordinals of type {contentType} is not yet supported.
      </Text>
    ),
  });
}

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
    <>
      <Header>
        <div className="absolute bottom-0 left-0 top-0 flex items-center">
          <div className="pr-4" />
          <ChevronLeft className="shrink-0" />
        </div>
        <Text>Details</Text>
      </Header>

      <Preview contentType={contentType} blob={blob} />

      <div className="pb-6" />

      <div className="px-4">
        <H1>Inscription {metadataQuery.data.number}</H1>

        <div className="pb-2" />

        <Hr />

        <div className="pb-6" />

        <DetailHeader>Inscription ID</DetailHeader>
        <div className="pb-2" />
        <Text className="break-words">{metadataQuery.data.id}</Text>
      </div>

      {metadataQuery.data && (
        <pre className="text-white">
          {JSON.stringify(metadataQuery.data, null, 2)}
        </pre>
      )}
    </>
  );
}
