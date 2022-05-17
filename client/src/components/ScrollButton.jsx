import { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from "@mui/material";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {

    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 100) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behaviour: 'smooth'
    });
  }

  window.addEventListener('scroll', toggleVisible);

  return (
    <Button>
      <ArrowUpwardIcon onClick={scrollToTop}
      style={{display: visible ? 'inline' : 'none'}} />
    </Button>
  );
}

export default ScrollButton;