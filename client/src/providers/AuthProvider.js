import { createContext, useState } from 'react';

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

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}