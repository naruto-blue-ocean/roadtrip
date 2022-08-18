import React, { useState } from 'react';

export const AuthContext = React.createContext();

export default AuthProvider = ( {children} ) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [currentTripId, setCurrentTripId] = useState(null);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
}