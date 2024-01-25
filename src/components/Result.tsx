import { ChevronRight } from "../icons/ChevronRight";

import { Text } from "./Text";

export function Result(props: { id: string }) {
  return (
    <div className="flex h-12 items-center justify-between">
      <Text>Inscription {props.id}</Text>
      <ChevronRight />
    </div>
  );
}
