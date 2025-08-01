import { createContext, useState, useEffect, type Dispatch, type SetStateAction,  } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UserContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isAuto: boolean;
  setIsAuto: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/profile`, {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading, isAuto, setIsAuto }}>
      {children}
    </UserContext.Provider>
  );
}
