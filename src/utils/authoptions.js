import GoogleProvider from "next-auth/providers/google";
import connectDB from "../config/database";
import User from "../app/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on a successful sign in
    async signIn({ profile }) {
      //connect to database
      connectDB();
      //check if user exist
      const userExists = await User.findOne({ email: profile.email });
      //if not,create new user
      if (!userExists) {
        const username = profile.name.split(" ")[0];
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      //return true to allow sign in
      return true;
    },
    //session callback function that modifies the session object
    async session({ session }) {
      //get user from database
      const user = await User.findOne({ email: session.user.email });
      //assign user id from session
      session.user.id = user._id.toString();
      //return session
      return session;
    },
  },
};
