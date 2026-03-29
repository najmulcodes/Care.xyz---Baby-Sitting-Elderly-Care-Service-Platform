import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-client-secret",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo credentials for testing
        const demoUsers = [
          {
            id: "1",
            name: "Demo User",
            email: "demo@care.xyz",
            password: "Demo@123",
            image: null,
          },
          {
            id: "2",
            name: "Admin User",
            email: "admin@care.xyz",
            password: "Admin@123",
            image: null,
          },
        ];

        const user = demoUsers.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );

        if (user) {
          return { id: user.id, name: user.name, email: user.email, image: user.image };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-demo",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
