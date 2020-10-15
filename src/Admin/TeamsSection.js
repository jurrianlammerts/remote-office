import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../Components/Card';
import CardSkeleton from '../Components/CardSkeleton';
import Divider from '../Components/Divider';

const useStyles = makeStyles((theme) => ({
  flex: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    display: 'flex',
  },
}));

const TeamsSection = ({ loaded, data: initialData }) => {
  const classes = useStyles();
  const [data, setData] = useState(initialData);

  const addTeam = (team) => {
    console.log(team);
  };

  return (
    <div>
      <Divider button onAdd={(e) => addTeam(e)}>
        Teams
      </Divider>
      <main className={classes.flex}>
        {data.map((item) =>
          loaded ? (
            <Card
              item={item}
              key={item.id}
              link={`/teams/${item.id}`}
              editable
            />
          ) : (
            <CardSkeleton key={item.id} />
          ),
        )}
      </main>
    </div>
  );
};

export default TeamsSection;
