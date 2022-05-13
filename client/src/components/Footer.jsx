import Toolbar from '@mui/material/Toolbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import "../styles/Footer.scss";

export default function Footer() {
  return (
    <div class="main-footer">
      <div class="logo-footer">
        <h3><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h3>
      </div>
    </div>
  )
}