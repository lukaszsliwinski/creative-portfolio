// Project card component with description, technologies used, link to source code and link to app

import Image from 'next/image';
import { faCode, faLink } from '@fortawesome/free-solid-svg-icons';
import HoverFlip from '@/components/HoverFlip';
import { ProjectCardProps } from '@/types';

export default function ProjectCard({
  children,
  previewSrc,
  title,
  description,
  sourceUrl,
  linkUrl
}: ProjectCardProps) {
  return (
    <div className="w-md mx-2 sm:mx-4 my-5 px-5 py-4 sm:px-8 sm:py-6 bg-white/10 flex flex-col items-center justify-center rounded sm:rounded-lg select-none">
      <h3 className="w-full font-normal text-xl sm:text-2xl">{title}</h3>
      <div className="w-full flex space-x-3 py-2 sm:py-3">{children}</div>
      <div className="whitespace-pre-line text-xs/5 sm:text-xs/6 text-justify h-24 overflow-y-hidden">
        {description}
      </div>

      <div className="mt-3 sm:mt-6">
        <Image
          className="mx-auto rounded w-75 sm:w-full"
          src={previewSrc}
          alt="apps screen"
          width="400"
          height="260"
          draggable={false}
        />
        <div className="mt-4 flex flex-wrap justify-center leading-[1.8rem]">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center w-24 h-9 border rounded mx-2"
          >
            <HoverFlip text="Code" icon={faCode} size="sm" />
          </a>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center w-24 h-9 border rounded mx-2"
          >
            <HoverFlip text="Link" icon={faLink} size="sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
