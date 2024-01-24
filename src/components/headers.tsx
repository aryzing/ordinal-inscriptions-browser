export function Header(props: { children: React.ReactNode }) {
  return (
    <header className="text-white text-center text-sm font-medium whitespace-nowrap mt-2">
      {props.children}
    </header>
  );
}
