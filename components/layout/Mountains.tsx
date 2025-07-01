import Image from "next/image";

export default function Mountains() {
  return (
    <Image
      src="/mountains.webp"
      alt="Mountains"
      className="fixed bottom-0 left-0 w-full pointer-events-none select-none z-50 drop-shadow-top"
      draggable={false}
      width={1920}
      height={400}
      priority
      unoptimized
    />
  );
}