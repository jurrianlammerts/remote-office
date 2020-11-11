import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Board from 'react-trello';

import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ProjectDivider from '../Components/ProjectDivider';
import PageSettingsMenu from '../Components/PageSettings';
import AuthContext from '../Context/authContext';

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
      title: 'Product Backlog',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins',
          draggable: false,
        },
        {
          id: 'Card2',
          title: 'Navigation Menu',
          description: 'Transfer via NEFT',
          label: '35 mins',
          metadata: { sha: 'be312a1' },
        },
      ],
    },
    {
      id: 'lane2',
      title: 'In Progress',
      cards: [
        {
          id: 'Card3',
          title: 'Default Content Page',
          description: 'Content for basic content page',
          label: '15 mins',
        },
        {
          id: 'Card4',
          title: 'Scene Landing Page',
          description: 'Get all videos from client A',
          label: '35 mins',
        },
        {
          id: 'Card5',
          title: 'Send All Invoices',
          description: 'Complete before 17 oct.',
          label: '1 hour',
        },
      ],
    },
    {
      id: 'lane3',
      title: 'Completed',
      cards: [
        {
          id: 'Card7',
          title: 'Discuss possible animations',
          description: 'Fixed before deadline',
          label: '15 mins',
        },
        {
          id: 'Card8',
          title: 'Write Copy for Contact page',
          description: 'Don`t spent to much time on this',
          label: '5 mins',
        },
        {
          id: 'Card9',
          title: 'Check with Client C',
          description: 'Invoices still not paid 🤬',
          label: '10 mins',
        },
        {
          id: 'Card10',
          title: 'Grab a coffee',
          description: 'And chill',
          label: '1 hour',
        },
      ],
    },
  ],
};

function SingleItemPage({ item, history }) {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const [openKanban, setKanbanOpen] = useState(false);
  const [openSimplicate, setSimplicateOpen] = useState(false);

  useEffect(() => {
    !authContext.user && history.push('/login');
  }, [authContext, history]);

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

export default withRouter(SingleItemPage);
