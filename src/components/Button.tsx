import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
  },
) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={twMerge(
        "items-center justify-center whitespace-nowrap rounded-xl bg-indigo-600 px-16 py-4 text-center text-sm font-medium text-white disabled:bg-indigo-300",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
