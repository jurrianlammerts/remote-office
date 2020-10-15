import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';

import simplicateSrc from '../images/simplicate.png';
import trelloSrc from '../images/trello.png';
import donedoneSrc from '../images/donedone.png';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 2,
    position: 'absolute!important',
    top: '-6px!important',
  },
  paper: {
    padding: 12,
  },
  btn: {
    margin: 12,
  },
}));

const Divider = ({ children, button, onAdd, functions, state }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSubmit = (event) => {
    onAdd();

    setAnchorEl(false);
  };

  let className;

  const open = Boolean(anchorEl);
  if (children) className = 'separator';
  else className = 'separator-line';

  return (
    <div className="row">
      <div className={className}>
        {button && (
          <>
            <button onClick={handleToggle} className="separator_btn">
              <span>+</span>Add Plugin
            </button>
            <Popper
              open={open}
              className={classes.popper}
              role={undefined}
              transition
              disablePortal
              anchorEl={anchorEl}
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
                  <Paper className={classes.paper}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      {!state.openKanban && (
                        <Button
                          variant="contained"
                          className={classes.btn}
                          onClick={() => {
                            functions.setKanbanOpen(true);
                            handleToggle();
                          }}
                        >
                          <img alt="trello-logo" src={trelloSrc} />
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        className={classes.btn}
                        onClick={() => {
                          // functions.setKanbanOpen(true);
                          handleToggle();
                        }}
                      >
                        <img alt="donedone-logo" src={donedoneSrc} />
                        DoneDone
                      </Button>

                      {!state.openSimplicate && (
                        <Button variant="contained" className={classes.btn}>
                          <img alt="simplicate-logo" src={simplicateSrc} />
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btn}
                        onClick={handleSubmit}
                      >
                        close
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
