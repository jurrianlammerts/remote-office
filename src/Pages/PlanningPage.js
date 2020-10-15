import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  flex: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    display: 'flex',
  },
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  img: {
    width: '100vw',
  },
}));

export default function Projects() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      planning
    </div>
  );
}
