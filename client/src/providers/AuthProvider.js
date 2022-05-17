import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

export const authContext = createContext();

export default function AuthProvider(props) {

  // Set state of user when on site
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(['credentials']);

  useEffect(() => {
    if (cookies['credentials']) {
      setAuth(true);
      setUser(cookies['credentials']);
    }
  }, [cookies]);

  // Handles login
  const loginHandler = (data) => {
    const { email, password } = data

    return axios
      .post('/api/users/login', { email, password })
      .then(res => {
        const user = res.data;
        setCookies('credentials', user);
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
    removeCookie('credentials');
  };

  // Handles account registration
  const registerHandler = (data) => {
    const { name, email, password} = data;

    return axios
      .post('/api/users/register', { name, email, password})
      .then(res => {
        const user = res.data;
        setCookies('credentials', user);

        return user;
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