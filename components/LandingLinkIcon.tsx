import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LandingLinkIcon({ icon }: { icon: IconDefinition }) {
  return (
    <>
      <span className="block transition-transform duration-200 group-hover:-translate-y-12">
        <FontAwesomeIcon icon={icon} size="xl" />
      </span>
      <span className="block absolute left-0 top-12 w-full transition-transform duration-200 group-hover:-translate-y-12 text-main">
        <FontAwesomeIcon icon={icon} size="xl" />
      </span>
    </>
  );
}