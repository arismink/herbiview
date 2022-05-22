import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

import '../index.scss';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
}, []);

    return (
        <div className="top-to-btm">
          {" "}
            {showTopBtn && (
              <FontAwesomeIcon icon={faAnglesUp} className="icon-position icon-style"
              onClick={goToTop}
              />
            )}

          {" "}
        </div>
    );
};
export default ScrollToTop;