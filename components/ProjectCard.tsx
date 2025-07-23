import { ReactNode } from 'react';
import Image from 'next/image';
import { faCode, faLink } from '@fortawesome/free-solid-svg-icons';
import ProjectLink from './ProjectLink';

export interface IProjectCard {
  children: ReactNode;
  previewSrc: string;
  title: string;
  app: string;
  description: string;
  sourceUrl: string;
  linkUrl: string;
}


// ProjectCard component
export default function ProjectCard({
  children,
  previewSrc,
  title,
  app,
  description,
  sourceUrl,
  linkUrl
}: IProjectCard) {
  // Getting the features array from the translation files
  return (
    <div className="w-md mx-4 my-5 px-8 py-6 bg-white/10 flex flex-col items-center justify-center rounded-lg select-none">

      <h3 className="w-full font-normal text-2xl">{title}</h3>
      <div className="w-full flex space-x-3 py-3">{children}</div>
      <div className="whitespace-pre-line text-xs/6 text-justify h-24 overflow-y-hidden">
        {description}
      </div>

      <div className="mt-6">
        <Image
          className="mx-auto rounded"
          src={previewSrc}
          alt="apps screen"
          width="400"
          height="260"
          draggable={false}
        />
        <div className="mt-4 flex flex-wrap justify-center">
          <ProjectLink href={sourceUrl} text='Code' icon={faCode} />
          <ProjectLink href={linkUrl} text='Link' icon={faLink} />
        </div>
      </div>
    </div>
  );
}
