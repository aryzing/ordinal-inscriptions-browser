export function Header(props: { children: React.ReactNode }) {
  return (
    <header className="relative flex min-h-[52px] items-center justify-center">
      {props.children}
    </header>
  );
}

export function H1(props: { children: React.ReactNode }) {
  return (
    <h1 className="text-base font-semibold text-white">{props.children}</h1>
  );
}

export function DetailHeader(props: { children: React.ReactNode }) {
  return <h3 className="text-xs text-white opacity-70">{props.children}</h3>;
}
