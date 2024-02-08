import { env } from "./config";

export const uri = {
  auth: {
    GOOGLE_LOGIN: "/login/google",
    GITHUB_LOGIN: "/login/github",
    GET_USER_SESSION: "/oauth/user",
    CREDENTIALS_LOGIN: "/auth/seller/login",
    REGISTER: "/auth/seller/register",
  },
  resources: {
    USERS: "/users/",
    GET_BUYERS: "/user/getBuyers",
  },
  services: {
    OAUTH2_GOOGLE_STATUS: "/login/google/status",
    OAUTH2_GITHUB_STATUS: "/login/github/status",
  },
};
