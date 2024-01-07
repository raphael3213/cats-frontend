import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

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
          placeholder: "jsmith",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // return { email: "asndfd" };
        console.log("MOOMOMOMMOMMOMO");
        if (!credentials?.email || !credentials.password) return null;
        const { email, password } = credentials;
        const res = await axios.post(
          "http://localhost:3000/auth/signin",
          credentials
        );
        if (res.status === 401) {
          return null;
        } else {
          return res.data;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl);
      return url;
    },
    async jwt({ token, user, account }) {
      console.log(token, user, account);
      return token;
    },

    async session({ session, token }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
