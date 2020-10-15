import React from 'react';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '../Components/Divider';

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: '24px auto',
  },
  avatarGroup: {
    justifyContent: 'flex-end',
  },
});

export default function SingleTeamPage({ item }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" gutterBottom>
        {item.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {item.body}
      </Typography>

      <Divider />

      <AvatarGroup className={classes.avatarGroup} max={4}>
        {item.people.map((person, index) => (
          <Avatar key={index.toString()}>{person.shortName}</Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
