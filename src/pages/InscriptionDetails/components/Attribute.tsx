import { Text } from "../../../components/Text";

interface Props {
  name: string;
  value: string;
}
export function Attribute({ name, value }: Props) {
  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className="text-xs text-white text-opacity-70">{name}</div>
      <div className="flex h-10 items-center text-ellipsis rounded-lg bg-zinc-800 px-2">
        <Text>{value}</Text>
      </div>
    </div>
  );
}
