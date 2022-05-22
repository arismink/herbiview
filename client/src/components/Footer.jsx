import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira, faInstagram, faFacebookSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Typography } from '@mui/material';

import "../styles/Footer.scss";

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="logo-footer">
        <h3><FontAwesomeIcon icon={faEnvira} /> HERBIVIEW</h3>
      </div>

      <div className="footer-body">
        <div className="footer-body-about">

          <Typography variant="body2">
            Company<br/>

          </Typography>
          <Typography variant="caption">
            About Us
          </Typography>
        </div>

        <div className="footer-body-git">
          <Typography variant="body2">
            GitHub <br/>

          </Typography>
          <Typography variant="caption">
            Link
          </Typography>
        </div>

        <div className="footer-body-follow us">
          <Typography variant="body2">
            Follow Us: <br/>
          </Typography>
          <Typography variant="h6">
            <FontAwesomeIcon icon={faInstagram} /> <FontAwesomeIcon icon={faFacebookSquare} /> <FontAwesomeIcon icon={faLinkedin} />
          </Typography>
        </div>


      </div>

    </div>
  )
}