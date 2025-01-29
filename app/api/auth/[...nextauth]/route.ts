import NextAuth, { NextAuthOptions, Session, User, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extending the default Session type to support custom fields
interface CustomUser extends User {
  id: string;
  creationDate: string;
  defaultMessageColor: string;
}

// Extending the default session type
interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          return null;
        }

        const user = await response.json();
        if (user.user && user.user.id) {
          return {
            id: user.user.id,
            name: user.user.username,
            email: user.user.email,
            creationDate: user.user.creationDate,
            defaultMessageColor: user.user.defaultMessageColor,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.creationDate = (user as CustomUser).creationDate;
        token.defaultMessageColor = (user as CustomUser).defaultMessageColor;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.creationDate = token.creationDate as string;
      session.user.defaultMessageColor = token.defaultMessageColor as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };