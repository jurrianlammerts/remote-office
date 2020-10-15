import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../Components/Card';
import CardSkeleton from '../Components/CardSkeleton';
import Divider from '../Components/Divider';
import { allTeams, allProjects, companyNews } from '../utils/fakeData';
import TeamsSection from './TeamsSection';

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
}));

function AdminPage({ user }) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <div className={classes.content}>
      <div className={classes.page}>
        <Divider>Company</Divider>
        <main className={classes.flex}>
          {companyNews.map((item) =>
            loaded ? (
              <Card item={item} key={item.id} />
            ) : (
              <CardSkeleton key={item.id} />
            ),
          )}
        </main>
        <TeamsSection data={allTeams} loaded={loaded} />
        <Divider button>Projects</Divider>
        <main className={classes.flex}>
          {allProjects.map((item) =>
            loaded ? (
              <Card
                item={item}
                key={item.id}
                link={`/projects/${item.id}`}
                editable
              />
            ) : (
              <CardSkeleton key={item.id} />
            ),
          )}
        </main>
      </div>
    </div>
  );
}
export default AdminPage;
