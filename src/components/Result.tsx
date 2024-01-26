import { Link } from "react-router-dom";

import { ChevronRight } from "../icons/ChevronRight";

import { Text } from "./Text";

export function Result(props: { id: string }) {
  return (
    <Link
      to={`/inscription/${props.id}`}
      className="flex h-12 w-full items-center justify-between px-2 hover:cursor-pointer hover:rounded-xl hover:bg-zinc-800"
    >
      <Text>Inscription {props.id.slice(0, 8)}</Text>
      <ChevronRight />
    </Link>
  );
}
