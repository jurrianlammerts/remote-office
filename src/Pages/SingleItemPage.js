import React, { useState } from 'react';
import Board from 'react-trello';

import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ProjectDivider from '../Components/ProjectDivider';
import PageSettingsMenu from '../Components/PageSettings';

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: '24px auto',
    background: 'white',
    paddingBottom: 48,
    borderRadius: 12,
    position: 'relative',
  },
  avatarGroup: {
    justifyContent: 'center',
    marginBottom: '0.80em',
  },
  content: {
    padding: 24,
    margin: '0 auto',
    width: '100%',
  },
  contentItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  board: {
    padding: '24px 0',
  },
  navButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
});

const initialData = {
  lanes: [
    {
      id: 'lane1',
      title: 'Backlog',
      cards: [],
    },

    {
      id: 'lane2',
      title: 'In Progress',
      cards: [],
    },
    {
      id: 'lane3',
      title: 'Completed',
      cards: [],
    },
  ],
};

export default function SingleItemPage({ item }) {
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const [openKanban, setKanbanOpen] = useState(false);
  const [openSimplicate, setSimplicateOpen] = useState(false);

  const addToPage = () => {
    console.log('add');
  };

  return (
    <div className={classes.root}>
      <div className={classes.navButton}>
        <PageSettingsMenu />
      </div>
      <div className={classes.content}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          className={classes.contentItem}
        >
          {item.title}
        </Typography>
        <AvatarGroup className={classes.avatarGroup} max={4}>
          {item.people.map((person, index) => (
            <Avatar key={index.toString()}>{person.shortName}</Avatar>
          ))}
        </AvatarGroup>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.contentItem}
        >
          {item.body}
        </Typography>
      </div>

      <ProjectDivider
        button
        onAdd={addToPage}
        functions={{ setKanbanOpen, setSimplicateOpen }}
        state={{ openKanban, openSimplicate }}
      />

      {openKanban && (
        <div className={classes.board}>
          <Board
            data={data}
            draggable
            editable
            onDataChange={(newData) => setData(newData)}
          />
        </div>
      )}
    </div>
  );
}
