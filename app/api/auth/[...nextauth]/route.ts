import NextAuth, { AuthOptions, Session, User, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extending the default Session type to support custom fields
interface CustomUser {
  id: string;
  name: string;
  email: string;
  creationDate: string;
  defaultMessageColor: string;
}

interface CustomJWT extends JWT {
  id: string;
  name: string;
  email: string;
  creationDate: string;
  defaultMessageColor: string;
}

// Extending the default session type
interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions: AuthOptions = {
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
          return null; // Invalid credentials
        }

        const user = await response.json();
        console.log(user.user); // This is fine for debugging

        if (user.user && user.user.id) {
          // Returning the object with `name` instead of `username` as per CustomUser
          return {
            id: user.user.id,
            name: user.user.username, // Assuming `username` is intended to be `name`
            email: user.user.email,
            creationDate: user.user.creationDate,
            defaultMessageColor: user.user.defaultMessageColor,
          };
        }

        return null; // Invalid credentials
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  expiresIn:'1h',
  debug: true,
  pages: {
    signIn: "/login", // Corrected from 'loginIn'
  },
  callbacks: {
    async jwt({ token, user }: { token: CustomJWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.creationDate = user.creationDate;
        token.defaultMessageColor = user.defaultMessageColor;
      }
      return token;
    },

    // Adjusted session callback to match the expected type
    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      if (token) {
        // Ensure the custom fields are added to the session.user
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.creationDate = token.creationDate;
        session.user.defaultMessageColor = token.defaultMessageColor;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };