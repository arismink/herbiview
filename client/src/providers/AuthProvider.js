import { createContext, useState } from 'react';

import axios from "axios";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Perform login process for the user & save authID, etc
  const login = function(email, password) {
    // query login route, to query db, to see if email and password match
    const authTry = { email, password };
    fetch('/login', { body: authTry })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // check if data returned exactly 1 row
        setAuth(true);
        setUser({ email, name: data.name });  // get name from the response obj
      })
      .catch((error) => {
        console.error('Error:', error);
        setAuth(false);
        setUser(null);
      });

  };

  const logout = function() {
    setAuth(false);
    setUser(null);
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
        setUser()

        return 'ok'
      })
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout, registerHandler };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}