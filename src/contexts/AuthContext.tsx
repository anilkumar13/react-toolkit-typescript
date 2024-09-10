import { createContext, useState, useEffect, ReactNode } from 'react';
type AuthInitalValue = {
  isAuthenticated?: boolean;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};
type comProps = {
  children: ReactNode;
};
export const AuthContext: React.Context<AuthInitalValue> = createContext({});
export const AuthContextProvider: React.FC<comProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Simulate an asynchronous check for authentication
    const checkAuthStatus = () => {
      //const token = localStorage.getItem('token');
      const token = false;
      setIsAuthenticated(!!token); // Update the authentication status based on the presence of a token
    };

    checkAuthStatus();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
