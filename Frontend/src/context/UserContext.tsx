import React, { useEffect, useState, createContext, type ReactNode } from "react";
import request from "../utils/request";
import API_PATH from "../utils/apiPath";
import authManager from "../utils/authManager";

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
    authManager.clearSession();
  };

  useEffect(() => {
    if (user) {
      return;
    }

    // 检查authManager中的会话
    const session = authManager.getSession();
    if (!session) {
      setLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const res = await request.get(API_PATH.GET_USER, {})
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