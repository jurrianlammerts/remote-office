import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MultipleSelect from './MultiSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function AddForm() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.input}>
        <TextField id="title" label="Title" color="secondary" />
        <TextField id="description" label="Description" color="secondary" />
        <MultipleSelect />
      </div>
    </form>
  );
}
