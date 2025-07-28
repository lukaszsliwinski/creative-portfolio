import moment from 'moment';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import HoverFlip from '@/components/HoverFlip';

// Footer component
export default function Footer() {
  // Getting the current year using moment
  const year = moment().year();

  return (
    <footer className="absolute bottom-0 flex justify-between items-center px-5 py-4 mt-8 border-t w-screen">
      <div className="text-sm font-light">&copy; 2023-{year} ŁUKASZ ŚLIWIŃSKI</div>
      <div className="h-7">
        <a
          href="https://github.com/lukaszsliwinski/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-2xl"
        >
          <HoverFlip icon={faGithub} size="sm" />
        </a>
        <a
          href="https://www.linkedin.com/in/lsliwinski/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-2xl"
        >
          <HoverFlip icon={faLinkedin} size="sm" />
        </a>
      </div>
    </footer>
  );
}
