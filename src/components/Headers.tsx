export function Header(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`mt-2 text-sm text-white ${props.className}`}>
      {props.children}
    </header>
  );
}
