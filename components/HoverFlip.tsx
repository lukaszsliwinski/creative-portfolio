import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HoverFlip({ text, icon, size }: { text?: string, icon?: IconDefinition, size: 'sm' | 'lg' }) {
  return (
    <span className={`inline-block relative overflow-hidden group cursor-pointer ${size === 'sm' ? 'h-7' : 'h-14'}`}>
      <span className={`
        inline-flex space-x-2 items-center transition-transform duration-200
        ${size === 'sm' ? 'group-hover:-translate-y-7' : 'group-hover:-translate-y-15'}
        `}>
        {text && <span>{text}</span>}
        {icon && <FontAwesomeIcon icon={icon} size={size == 'sm' ? '1x' : '2x'}/>}
      </span>
      <span className={`
        inline-flex space-x-2 items-center absolute left-0 w-full transition-transform duration-200 text-main
        ${size === 'sm' ? 'top-7 group-hover:-translate-y-7' : ' top-15 group-hover:-translate-y-15'}
        `}>
        {text && <span>{text}</span>}
        {icon && <FontAwesomeIcon icon={icon} size={size == 'sm' ? '1x' : '2x'} />}
      </span>
    </span>
  );
}