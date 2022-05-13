import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import "../styles/Nav.scss";

import Search from './Search';

export default function Nav() {

  return (
    <div className="main-navbar">
        <div className="main-logo">
          <h2><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h2>
        </div>

      <Search />
      
      <div className="navbar-link">
        <a href="#">Login</a> | <a href="#">Signup</a>
      </div>

    </div>
  )

};

