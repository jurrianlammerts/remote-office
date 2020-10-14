import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../images/Screenshot 2020-10-01 at 14.49.21.png';

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
      <img src={image} className={classes.img} />
    </div>
  );
}
