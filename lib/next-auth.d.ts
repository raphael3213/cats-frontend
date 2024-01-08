import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      ksuid: string;
      email: string;
    };

    accessToken: string;

    refreshToken: string;

    expiresIn: number;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      ksuid: string;
      email: string;
    };

    accessToken: string;

    refreshToken: string;

    expiresIn: integer;

    cookie: string[];
  }
}
