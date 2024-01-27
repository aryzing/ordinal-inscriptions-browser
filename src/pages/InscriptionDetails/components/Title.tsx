import { H1 } from "../../../components/Headers";
import { Hr } from "../../../components/Hr";

interface Props {
  number: number;
}
export function Title({ number }: Props) {
  return (
    <div className="flex flex-col gap-y-2 pb-6">
      <H1>Inscription {number}</H1>
      <Hr />
    </div>
  );
}
