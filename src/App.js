import React, { useState, useContext, createContext, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthService from './services/authService';
import GraphService from './services/graphService';

import SingleTeamPage from './Components/Pages/SingleTeamPage';
import SingleProjectPage from './Components/Pages/SingleProjectPage';
import AdminPage from './Components/Admin';
import KanbanPage from './Components/Pages/KanbanPage';
import ProjectsPage from './Components/Pages/ProjectsPage';
import PlanningPage from './Components/Pages/PlanningPage';
import TeamsPage from './Components/Pages/TeamsPage';
import NotFound from './Components/Pages/NotFound';
import Navbar from './Components/Navbar';

import { allProjects, allTeams } from './utils/fakeData';
import HomePage from './Components/HomePage';

const AuthContext = createContext(null);
const authService = new AuthService();
const graphService = new GraphService();

function App() {
  const context = useContext(AuthContext);

  const [projects, setProjects] = useState(allProjects);
  const [teams, setTeams] = useState(allTeams);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [apiCallFailed, setApiCallFailed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    user && setUser(user);
  }, []);

  const callAPI = () => {
    setApiCallFailed(false);
    authService.getToken().then(
      (token) => {
        console.log('token: ', token);
        graphService.getUserInfo(token).then(
          (data) => {
            console.log('data: ', data);
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
    setLoginFailed(true);
    authService.login().then((user) => {
      if (user) {
        setUser(user);
        setLoginFailed(false);
      } else {
        setLoginFailed(true);
      }
    });
  };

  const renderProjects = (routerProps) => {
    let projectId = parseInt(routerProps.match.params.id);
    let foundProject = projects.find(
      (projectObj) => projectObj.id === projectId,
    );
    return foundProject ? (
      <SingleProjectPage item={foundProject} />
    ) : (
      <NotFound />
    );
  };

  const renderTeams = (routerProps) => {
    let teamId = parseInt(routerProps.match.params.id);
    let foundTeam = teams.find((teamObj) => teamObj.id === teamId);
    return foundTeam ? <SingleTeamPage item={foundTeam} /> : <NotFound />;
  };

  return (
    <div className="App">
      <AuthContext.Provider>
        <Router>
          <div>
            {user && <Navbar user={user} logout={logout} callAPI={callAPI} />}
            {!user && <Redirect to="/" />}
            <Switch>
              <Route
                path="/teams/:id"
                render={(routerProps) => renderTeams(routerProps)}
              />

              <Route
                path="/projects/:id"
                render={(routerProps) => renderProjects(routerProps)}
              />

              <Route path="/teams">
                <TeamsPage />
              </Route>
              <Route path="/projects">
                <ProjectsPage />
              </Route>
              <Route path="/planning">
                <PlanningPage />
              </Route>
              <Route path="/sprint">
                <KanbanPage />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
              <Route path="/">
                <HomePage
                  login={login}
                  apiCallFailed={apiCallFailed}
                  user={user}
                />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
