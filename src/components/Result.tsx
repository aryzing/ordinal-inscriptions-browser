import { ChevronRight } from "../icons/ChevronRight";

import { Text } from "./Text";

export function Result(props: { id: string }) {
  return (
    <button className="flex h-12 w-full items-center justify-between hover:cursor-pointer hover:rounded-xl hover:bg-zinc-800">
      <Text>Inscription {props.id}</Text>
      <ChevronRight />
    </button>
  );
}
