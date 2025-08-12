// Bio card component

import { BioCardProps } from '@/types';

export default function BioCard({ text }: BioCardProps) {
  return <div className="bg-white/10 p-8 rounded text-justify">{text}</div>;
}
