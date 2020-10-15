import React, { useState } from 'react';
import Board from 'react-trello';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    maxWidth: 1150,
    margin: '0 auto',
  },
  board: {
    backgroundColor: '#f6f2ee!important',
    whiteSpace: 'normal!important',
    overflowY: 'visible!important',
  },
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

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
      title: 'Current Sprint',
      cards: [
        {
          id: 'Card6',
          title: 'Check with Client B',
          description: 'Call to see whatsupp',
          label: '10 mins',
        },
      ],
    },
    {
      id: 'lane4',
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

export default function Kanban() {
  const classes = useStyles();
  const [data, setData] = useState(initialData);

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <Board
          data={data}
          draggable
          editable
          className={classes.board}
          onDataChange={(newData) => setData(newData)}
        />
      </div>
    </div>
  );
}
