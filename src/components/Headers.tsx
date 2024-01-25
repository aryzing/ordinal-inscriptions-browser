export function Header(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`text-white text-sm mt-2 ${props.className}`}>
      {props.children}
    </header>
  );
}
