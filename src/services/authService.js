import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    let redirectUri = window.location.origin;

    this.applicationConfig = {
      clientID: process.env.REACT_APP_AUTH_ID,
      graphScopes: ['user.read'],
    };

    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      '',
      () => {
        // callback for login redirect
      },
      {
        redirectUri,
      },
    );
  }

  login = () => {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      (idToken) => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      },
    );
  };

  logout = () => {
    this.app.logout();
  };

  getUser = () => {
    return this.app.getUser();
  };

  getToken = () => {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      (accessToken) => {
        return accessToken;
      },
      (error) => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            (accessToken) => {
              return accessToken;
            },
            (err) => {
              console.error(err);
            },
          );
      },
    );
  };
}
