import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import "../styles/Footer.scss";

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="logo-footer">
        <h3><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h3>
      </div>

    </div>
  )
}