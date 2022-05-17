import { createContext, useState } from 'react';

import axios from "axios";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

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

  const logoutHandler = function() {
    setAuth(false);
    setUser(null);
    console.log('user?', user)
  };

  // Handles account registration
  const registerHandler = (data) => {

    return axios
      .post('/api/users/register', {
        name: data.name,
        email: data.email,
        password: data.password
      })
      .then(res => {
        const body = JSON.parse(res.config.data);

        const user = { email: body.email, password: body.password };

        setAuth(true);
        setUser(user);

        return 'ok'
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