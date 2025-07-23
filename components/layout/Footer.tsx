import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Footer component
export default function Footer() {
  // Getting the current year using moment
  const year = moment().year();

  return (
    <footer className="absolute bottom-0 flex justify-between items-center px-5 py-4 mt-8 border-t w-screen">
      <div className="text-sm font-light">&copy; 2023-{year} ŁUKASZ ŚLIWIŃSKI</div>
      <div>
        <a
          href="https://github.com/lukaszsliwinski/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a
          href="https://www.linkedin.com/in/lsliwinski/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </div>
    </footer>
  );
}
