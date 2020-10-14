import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { MicrosoftLoginButton } from 'react-social-login-buttons';

import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    padding: 24,
    minWidth: 300,
  },
  logo: {
    padding: '24px 29px 0 29px',
  },
  text: {
    margin: 5,
  },
}));

export default function HomePage({ login, apiCallFailed, user }) {
  const classes = useStyles();
  return (
    <div className="login">
      {user && <Redirect to="/admin" />}
      <div className={classes.login}>
        <Card>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.card}>
            <Typography variant="body1" component="p" className={classes.text}>
              Welcome back, please login!
            </Typography>
            <MicrosoftLoginButton onClick={login} className="login-btn" />

            {apiCallFailed && (
              <strong key="apiCallFailed">Graph API call unsuccessful</strong>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
