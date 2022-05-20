import * as React from 'react';

import { useContext } from 'react';
import { authContext } from 'providers/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

// Logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import SearchBar from './Search';
import { StepConnector } from '@mui/material';

export default function Nav() {
  const { user, logoutHandler } = useContext(authContext);

  const onLogout = function() {
    logoutHandler();
    navigate("/");
  }

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>

      { user && (
          <Typography component={'span'} sx={{color: 'black', marginX: "1em", marginTop: "0.5em"}}>
           <AccountCircle /> {user.name}
           <StepConnector sx={{ paddingTop: 1}}/>
          </Typography>
      )}

      <MenuItem onClick={e => {
          console.log("My Account clicked");
          handleMenuClose();
        }}>My Account</MenuItem>
      <MenuItem onClick={e => {
          navigate("/search-history");
          handleMenuClose();
        }}>My Search History</MenuItem>
      </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { user && (

        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </MenuItem>

      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ alignItems: "center" }}
        position="fixed"
        style={{ background: '#FFFFFF' }}>
        <Toolbar>
          <Link to="/">
            <Typography
              variant="logo1"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <FontAwesomeIcon icon={faEnvira} /> HERBIVIEW
            </Typography>

            <Typography
              variant="logo1"
              noWrap
              component="div"
              sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' }}}
              style={{ fontSize: "2em"}}>
              <FontAwesomeIcon icon={faEnvira} />
            </Typography>

          </Link>

          <Box sx={{
            width: { md: 600 } }}>

            <SearchBar />
          </Box>


          <Box sx={{ display: { xs: 'flex', md: 'flex' } }} paddingRight={3}>

            { user && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                style={{color: 'black'}}>
                <AccountCircle />
              </IconButton>) }

          </Box>

          { user === null && (
            <Button variant="text" onClick={(e) => navigate("/login")}>Login</Button>
          )}

          { user && (

            <Button variant="text" onClick={onLogout}>Logout</Button>
          )}

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Toolbar />
    </Box>
  );
}
