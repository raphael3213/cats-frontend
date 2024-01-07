import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      ksuid: string;
      email: string;
    };

    accessToken: string;

    refreshToken: string;
  }

  interface Token {
    user: {
      ksuid: string;
      email: string;
    };

    accessToken: string;

    refreshToken: string;
  }
}
