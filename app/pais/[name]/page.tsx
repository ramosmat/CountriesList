export default function Country({
  params: { name },
}: {
  params: { name: string };
}) {
  return <h1>{name}</h1>;
}
