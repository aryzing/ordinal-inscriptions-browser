export function Header(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`text-sm text-white ${props.className}`}>
      {props.children}
    </header>
  );
}
