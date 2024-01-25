import { ButtonHTMLAttributes } from "react";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
  },
) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={`items-center justify-center whitespace-nowrap rounded-xl bg-indigo-600 px-16 py-4 text-center text-sm font-medium text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
