import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';

import AddForm from '../Components/AddFormDivider';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 2,
    position: 'absolute!important',
    top: '-6px!important',
  },
}));

const Divider = ({ children, button, onAdd }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSubmit = (event) => {

    onAdd()

    setOpen(false);
  };

  return (
    <div className="row">
      <div className="separator">
        {button && (
          <>
            <button onClick={handleToggle} className="separator_btn">
              <span>+</span>New
            </button>
            <Popper
              open={open}
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
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      <AddForm />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                      >
                        Add
                      </Button>
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Divider;
