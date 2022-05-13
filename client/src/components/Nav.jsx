import Toolbar from '@mui/material/Toolbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import "../styles/Nav.scss";

export default function Nav() {

  return (
    <div class="navbar">
      <Toolbar>
        <h2><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h2>


      </Toolbar>
    </div>
  )

};