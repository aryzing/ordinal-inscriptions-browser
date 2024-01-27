import { Link } from "react-router-dom";

import { ChevronRight } from "../icons/ChevronRight";

import { Text } from "./Text";

interface Props {
  bitcoinAddress: string;
  inscriptionId: string;
}
export function Result({ bitcoinAddress, inscriptionId }: Props) {
  return (
    <Link
      to={`/${bitcoinAddress}/${inscriptionId}`}
      className="flex h-12 w-full items-center justify-between rounded-xl px-2 hover:cursor-pointer hover:bg-zinc-800"
    >
      <Text>Inscription {inscriptionId.slice(0, 8)}</Text>
      <ChevronRight />
    </Link>
  );
}
