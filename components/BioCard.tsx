// Bio card component

import { BioCardProps } from '@/types';

export default function BioCard({ text }: BioCardProps) {
  return <div className="bg-white/10 py-4 px-5 xs:py-5 xs:px-6 sm:p-8 rounded text-justify">{text}</div>;
}
