import { ChevronRight } from "../icons/ChevronRight";
import { Text } from "./Text";

export function Result(props: { id: string }) {
  return (
    <div className="flex justify-between h-12 items-center">
      <Text>Inscription {props.id}</Text>
      <ChevronRight />
    </div>
  );
}
