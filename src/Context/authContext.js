import { createContext } from 'react';

const authContext = createContext({
  user: null,
  userInfo: null,
  login: () => {},
  logout: () => {},
  callAPI: () => {},
});

export default authContext;
