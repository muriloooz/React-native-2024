import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const Role = {
  SUPER: "Super",
  ADM: "ADM",
  USER: "USER"
};

export function Authprovider({ children }) {
  const [user, setUser] = useState({
    autenticated: null,
    user: null,
    role: null,
  });

  const signIn = async ({ email, password }) => {
    if (email === "super@email.com" && password === "Super123!") {
      setUser({
        autenticated: true,
         user: { id: 1, name: "Super Usuario", email },
         role: Role.SUPER,       
        });
    } else if (email === "adm@email.com" && password === "Adm123!") {
      setUser({
        autenticated: true,
        user: { id: 2, name: "Administrador", email },
        role: Role.ADM,       
       });
    } else if (email === "user@email.com" && password === "Ueer123!") {
      setUser({
        autenticated: true,
        user: { id: 3, name: "Usuario Comum", email },
        role: Role.USER,       
       });
    } else {
      setUser({
        autenticated: false,
        user: null,
        role: null,       
       });
    }

  };

  const signOut = async () => {
    setUser({});
  };

  useEffect(() => {
    console.log("AuthProvider: ", user);
  }, user);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}