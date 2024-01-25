import { ButtonHTMLAttributes } from "react";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
  }
) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={`text-white text-center text-sm font-medium whitespace-nowrap bg-indigo-600 justify-center items-center px-16 py-4 rounded-xl ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
