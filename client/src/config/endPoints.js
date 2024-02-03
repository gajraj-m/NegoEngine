import { env } from "./config";

export const uri = {
  auth: {
    GOOGLE_LOGIN: "/login/google",
    GITHUB_LOGIN: "/login/github",
    GET_USER_SESSION: "/oauth/user",
    CREDENTIALS_LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  resources: {
    USERS: "/users/",
  },
  services: {
    OAUTH2_GOOGLE_STATUS: "/login/google/status",
    OAUTH2_GITHUB_STATUS: "/login/github/status",
  },
};
