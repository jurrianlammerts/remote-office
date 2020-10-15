import React, { useState, useEffect } from 'react';
import './App.css';

import AuthContext from './Context/authContext';

import AuthService from './services/authService';
import GraphService from './services/graphService';

import Router from './Router';

const authService = new AuthService();
const graphService = new GraphService();

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
    </div>
  );
}

export default App;
