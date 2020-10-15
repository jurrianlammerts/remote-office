import React, { useState, useEffect } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AuthContext from './Context/authContext';

import AuthService from './services/authService';
import GraphService from './services/graphService';

import Router from './Router';

const authService = new AuthService();
const graphService = new GraphService();

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#6c63ff',
      contrastText: '#fff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ba63ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // error: will use the default color
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [apiCallFailed, setApiCallFailed] = useState(false);
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    user && setUser(user);
  }, []);

  const callAPI = () => {
    setApiCallFailed(false);
    authService.getToken().then(
      (token) => {
        graphService.getUserInfo(token).then(
          (data) => {
            setUserInfo(data);
          },
          (error) => {
            console.error(error);
            setApiCallFailed(true);
          },
        );
      },
      (error) => {
        console.error(error);
        setApiCallFailed(true);
      },
    );
  };

  const logout = () => {
    authService.logout();
  };

  const login = () => {
    setLoginSucceeded(false);
    authService.login().then((user) => {
      if (user) {
        setUser(user);
        setLoginSucceeded(true);
      } else {
        setLoginSucceeded(false);
      }
    });
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            user: user,
            userInfo: userInfo,
            login: login,
            logout: logout,
            callAPI: callAPI,
          }}
        >
          <Router />
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
