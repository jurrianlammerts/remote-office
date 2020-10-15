import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { MicrosoftLoginButton } from 'react-social-login-buttons';

import AuthContext from '../Context/authContext';

import Logo from '../Components/Logo';

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

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className="login">
      {authContext.user && (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )}
      <div className={classes.login}>
        <Card>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.card}>
            <Typography variant="body1" component="p" className={classes.text}>
              Welcome back, please login!
            </Typography>
            <MicrosoftLoginButton
              onClick={authContext.login}
              className="login-btn"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
