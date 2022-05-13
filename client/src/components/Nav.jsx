import Toolbar from '@mui/material/Toolbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import "../styles/Nav.scss";

export default function Nav() {

  return (
    <div class="main-navbar">
        <div class="main-logo">
          <h2><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h2>
        </div>

      <div class="searchbar">
        search bar component needs to go here
      </div>

      <div class="navbar-link">
        Login | Signup
      </div>

    </div>
  )

};