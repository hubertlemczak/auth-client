import { useLocalStorage } from '../hooks/useLocalStorage';

const { useState, createContext, useContext } = require('react');

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage('authToken');

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
