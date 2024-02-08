import { env } from "./config";

export const uri = {
  auth: {
    GOOGLE_LOGIN: "/login/google",
    GITHUB_LOGIN: "/login/github",
    GET_USER_SESSION: "/oauth/user",
    CREDENTIALS_LOGIN: "/auth/buyer/login",
    REGISTER: "/auth/buyer/register",
  },
  resources: {
    USERS: "/users/",
    GET_SELLERS: "/user/getSellers",
    GET_NEGO: "/nego/getNego",
    POST_NEGO: "/nego/postNego",
  },
  services: {
    OAUTH2_GOOGLE_STATUS: "/login/google/status",
    OAUTH2_GITHUB_STATUS: "/login/github/status",
  },
};
