import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const getRefreshToken = (refreshToken: string, cookie: string[]) => {
  return axios.put(
    "http://localhost:3000/auth/refresh",
    {},
    {
      withCredentials: true,
      headers: {
        Cookie: cookie,
      },
    }
  );
};
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          const { email, password } = credentials;
          const res = await axios.post(
            "http://localhost:3000/auth/signin",
            credentials
          );
          if (res.status === 401) {
            throw new Error("Wrong credentials");
          } else {
            return { ...res.data, cookie: res.headers["set-cookie"] };
          }
        } catch (e) {
          if (e instanceof Error) throw new Error(e.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token, user, account);
      if (user) {
        return { ...token, ...user };
      } else if (Date.now() / 1000 > token.expiresIn) {
        const data = await getRefreshToken(token.refreshToken, token.cookie);
        return { ...token, ...data.data };
      } else {
        return token;
      }
    },

    async session({ session, token }) {
      session.user = token.user;
      session.refreshToken = token.refreshToken;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
