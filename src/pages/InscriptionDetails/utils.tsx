const quantityVisible = 12;
export function abbreviateLocation(location: string) {
  const [txId, output, offset] = location.split(":");
  return `${abbreviateTxId(txId)}:${output}:${offset}`;
}

export function abbreviateTxId(hash: string) {
  return `${hash.slice(0, quantityVisible)}…${hash.slice(-quantityVisible)}`;
}

export function switchContentType(
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
