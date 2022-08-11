import { createContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  deauthenticate: () => Promise<void>;
}>({
  isAuthenticated: false,
  authenticate: async () => {},
  deauthenticate: async () => {},
});
