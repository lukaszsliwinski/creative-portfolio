export default function BioCard({ text }: { text: string }) {
  return (
    <div className="bg-white/10 p-8 rounded text-justify leading-8"
    >
      {text}
    </div>
  );
}