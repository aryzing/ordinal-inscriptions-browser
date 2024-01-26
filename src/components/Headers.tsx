import { twMerge } from "tailwind-merge";

export function Header(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={twMerge("text-sm text-white", props.className)}>
      {props.children}
    </header>
  );
}
