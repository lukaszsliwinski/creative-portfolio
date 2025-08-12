// Bio card component

export default function BioCard({ text }: { text: string }) {
  return (
    <div className="bg-white/10 p-8 rounded text-justify"
    >
      {text}
    </div>
  );
}
