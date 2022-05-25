import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira, faInstagram, faFacebookSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
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
            More Info<br/>

          </Typography>
          <Typography variant="caption">
            About Us
          </Typography>
        </div>

        <div className="footer-body-git">
          {/* <Typography variant="body2">
            GitHub <br/>

          </Typography> */}
          <Typography variant="h5">
            <a href="https://github.com/arismink/herbiview"> <FontAwesomeIcon icon={faGithub}/> </a>
          </Typography>
        </div>

        <div className="footer-body-follow us">
          <Typography variant="body2" sx={{display: "none"}}>
            Follow Us: <br/>
          </Typography>
          <Typography variant="h6" sx={{display: "none"}}>
            <FontAwesomeIcon icon={faInstagram} /> <FontAwesomeIcon icon={faFacebookSquare} /> <FontAwesomeIcon icon={faLinkedin} />
          </Typography>
        </div>


      </div>

    </div>
  )
}