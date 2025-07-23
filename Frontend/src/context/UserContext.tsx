import React, { useEffect, useState, createContext, type ReactNode } from "react";
import http from "../utils/http";
import API_PATH from "../utils/apiPath";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    setLoading(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (user) {
      return;
    }
    const Token = localStorage.getItem('token');
    if (!Token) {
      setLoading(false);
      return;
    }
    const getUser = async () => {
      try {
        const res = await http.get(API_PATH.GET_USER, {})
        console.log(res)
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        clearUser();
        console.log(err);
      }
    }
    getUser()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider