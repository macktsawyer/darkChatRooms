import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
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

        if (!response.ok) return null;

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
    strategy: "jwt" as SessionStrategy, // ✅ Explicitly define the type
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: { signIn: "/", signOut: "/" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.creationDate = user.creationDate;
        token.defaultMessageColor = user.defaultMessageColor;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name!,
        email: token.email!,
        creationDate: token.creationDate as string,
        defaultMessageColor: token.defaultMessageColor as string,
      };
      return session;
    },
  },
};

// ✅ Correctly export NextAuth handlers for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };