import { createContext, useState } from "react";

type AuthContextType = {
    auth: Record<string, any>,
    setAuth: React.Dispatch<React.SetStateAction<{}>>
}

const initialContextState: AuthContextType = {
    auth: {},
    setAuth: () => {}
}
export const AuthContext = createContext<AuthContextType>(initialContextState);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (context === undefined) {
//       throw new Error('useAuth must be used within an AuthProvider')
//     }
//     return context
//   }