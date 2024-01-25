export function Text(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-sm text-white ${props.className}`}>
      {props.children}
    </div>
  );
}
