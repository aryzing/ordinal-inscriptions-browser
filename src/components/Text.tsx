export function Text(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-white text-sm ${props.className}`}>
      {props.children}
    </div>
  );
}
