import React, { useEffect } from "react";

import { Text } from "../../../components/Text";
import { switchContentType } from "../utils";

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
  }, [blob, contentType]);

  return switchContentType(contentType, {
    image: (
      <img className="aspect-square w-full" src={URL.createObjectURL(blob)} />
    ),
    text: (
      <div className="aspect-square w-full bg-zinc-800 p-2">
        <pre className="aspect-square w-full overflow-auto text-white no-scrollbar">
          {text}
        </pre>
      </div>
    ),
    rest: (
      <Text>
        Preview of ordinals of type {contentType} is not supported yet.
      </Text>
    ),
  });
}
