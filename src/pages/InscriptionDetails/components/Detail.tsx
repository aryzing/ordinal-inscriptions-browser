import { Text } from "../../../components/Text";

import { DetailHeader } from "./DetailHeader";

interface Props {
  name: string;
  value: string;
}
export function Detail({ name, value }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <DetailHeader>{name}</DetailHeader>
      <Text className="break-words">{value}</Text>
    </div>
  );
}
