import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import HomeIcon from '@material-ui/icons/Home';
// import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AuthContext from '../Context/authContext';

import Logo from './Logo';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    margin: 0,
  },
  popper: {
    zIndex: 2,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  avatar: {
    color: '#fff',
    backgroundColor: '#6C63FF',
    width: 32,
    height: 32,
    fontSize: 16,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const authContext = useContext(AuthContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function getInitials(nameString) {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { user, logout, callAPI } = authContext;

  return (
    <div>
      <nav className="nav">
        <div className="logo">
          <Logo />
        </div>
        {user && (
          <div>
            <ul className="nav_list">
              <li>
                <Link to="/">
                  <HomeIcon />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/sprint">
                  <ScheduleIcon />
                  Schedule
                </Link>
              </li>
            </ul>
            <div className="avatar">
              <IconButton
                color="inherit"
                aria-label="open profile"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                edge="end"
                className={classes.menuButton}
                ref={anchorRef}
              >
                <Avatar className={classes.avatar}>
                  {getInitials(user.name)}
                </Avatar>
              </IconButton>
            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              className={classes.popper}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    zIndex: 3,
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={callAPI}>My account</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
