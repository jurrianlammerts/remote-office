import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
  red,
  amber,
  blue,
  cyan,
  deepPurple,
  indigo,
  lime,
} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    minWidth: 300,
    flex: 1,
    margin: theme.spacing(1),
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarGroup: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  actions: {
    height: theme.spacing(6),
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  amber: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  cyan: {
    color: theme.palette.getContrastText(cyan[500]),
    backgroundColor: cyan[500],
  },
  deepPurple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  lime: {
    color: theme.palette.getContrastText(lime[500]),
    backgroundColor: lime[500],
  },
}));

export default function CustomCard({ item, link }) {
  const classes = useStyles();
  const colors = [
    classes.red,
    classes.amber,
    classes.blue,
    classes.cyan,
    classes.deepPurple,
    classes.indigo,
    classes.lime,
  ];
  return (
    <Card className={classes.root}>
      {link ? (
        <Link to={link} className={classes.link}>
          <CardHeader title={item.title} />
          <CardContent className={classes.content}>
            <Typography variant="body1" color="textSecondary" component="p">
              {item.body}
            </Typography>
          </CardContent>
          {item.people && (
            <CardActions className={classes.actions}>
              <AvatarGroup className={classes.avatarGroup} max={4}>
                {item.people.map((person, index) => (
                  <Avatar
                    key={index.toString()}
                    className={colors[Math.floor(Math.random() * 7)]}
                  >
                    {person.shortName}
                  </Avatar>
                ))}
              </AvatarGroup>
            </CardActions>
          )}
        </Link>
      ) : (
        <>
          <CardHeader title={item.title} />
          <CardContent className={classes.content}>
            <Typography variant="body1" color="textSecondary" component="p">
              {item.body}
            </Typography>
          </CardContent>
          {item.people && (
            <CardActions className={classes.actions}>
              <AvatarGroup className={classes.avatarGroup} max={4}>
                {item.people.map((person, index) => (
                  <Avatar
                    key={index.toString()}
                    className={colors[Math.floor(Math.random() * 7)]}
                  >
                    {person.shortName}
                  </Avatar>
                ))}
              </AvatarGroup>
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
}
