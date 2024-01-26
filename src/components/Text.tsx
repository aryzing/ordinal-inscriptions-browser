import { twMerge } from "tailwind-merge";

export function Text(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("text-sm text-white", props.className)}>
      {props.children}
    </div>
  );
}
