import { Text } from "./Text";

export function Result(props: { id: string }) {
  return (
    <div className="flex justify-between h-12 align-middle">
      <Text className="flex flex-col justify-center">
        Inscription {props.id}
      </Text>
      <Text className="flex flex-col justify-center">{">>>"}</Text>
    </div>
  );
}
