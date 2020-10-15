import React, { useState, useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthContext from './Context/authContext';
import Navbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';

import SingleItemPage from './Pages/SingleItemPage';
import AdminPage from './Admin';
import KanbanPage from './Pages/KanbanPage';
import ProjectsPage from './Pages/ProjectsPage';
import PlanningPage from './Pages/PlanningPage';
import TeamsPage from './Pages/TeamsPage';
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';

import { allProjects, allTeams } from './utils/fakeData';

const Routes = () => {
  const authContext = useContext(AuthContext);
  const [teams, setTeams] = useState(allTeams);
  const [projects, setProjects] = useState(allProjects);

  const renderProjects = (routerProps) => {
    if (!authContext.user) return;
    let projectId = parseInt(routerProps.match.params.id);
    let foundProject = projects.find(
      (projectObj) => projectObj.id === projectId,
    );
    return foundProject ? (
      <SingleItemPage item={foundProject} />
    ) : (
      <NotFound />
    );
  };

  const renderTeams = (routerProps) => {
    if (!authContext.user) return;
    let teamId = parseInt(routerProps.match.params.id);
    let foundTeam = teams.find((teamObj) => teamObj.id === teamId);
    return foundTeam ? <SingleItemPage item={foundTeam} /> : <NotFound />;
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" component={LoginPage} />

        <PrivateRoute exact path="/" component={AdminPage} />

        <Route
          path="/teams/:id"
          render={(routerProps) => renderTeams(routerProps)}
        />

        <Route
          path="/projects/:id"
          render={(routerProps) => renderProjects(routerProps)}
        />

        <PrivateRoute path="/teams" component={TeamsPage} />
        <PrivateRoute path="/projects" component={ProjectsPage} />
        <PrivateRoute path="/planning" component={PlanningPage} />
        <PrivateRoute path="/sprint" component={KanbanPage} />
        
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
