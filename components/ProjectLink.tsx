import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProjectLink({ href, text, icon }: { href: string, text: string, icon: IconDefinition }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-24 h-8 overflow-hidden group cursor-pointer border rounded py-1 text-center mx-2"
    >
      <span className="block transition-transform duration-200 group-hover:-translate-y-8">
        {text}&nbsp;
        <FontAwesomeIcon icon={icon} size="1x" />
      </span>
      <span className="block absolute left-0 top-8 w-full transition-transform duration-200 group-hover:-translate-y-7 text-neutral-400">
        {text}&nbsp;
        <FontAwesomeIcon icon={icon} size="1x" />
      </span>
    </a>
  );
}