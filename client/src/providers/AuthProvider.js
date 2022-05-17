import { createContext, useState } from 'react';

import axios from "axios";

export const authContext = createContext();

export default function AuthProvider(props) {

  // Set state of user when on site
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Handles login
  const loginHandler = (data) => {
    const { email, password } = data

    return axios
      .post('/api/users/login', { email, password })
      .then(res => {
        const user = res.data;
        setAuth(true);
        setUser(user);

        return user;

      })
      .catch(err => {
        console.log('uh oh:', err)
      })
  }

  // Handles logout
  const logoutHandler = function() {
    setAuth(false);
    setUser(null);
  };

  // Handles account registration
  const registerHandler = (data) => {
    const { name, email, password} = data;

    return axios
      .post('/api/users/register', { name, email, password})
      .then(res => {
        const body = JSON.parse(res.config.data);

        const user = { email: body.email, password: body.password };

        setAuth(true);
        setUser(user);
      })
  };

  // authContext will expose these items
  const userData = { auth, user, logoutHandler, registerHandler, loginHandler };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}