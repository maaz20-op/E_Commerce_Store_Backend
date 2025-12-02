import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AuthModel } from "../models/authModel.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Google gives email here:
        const email = profile.emails?.[0]?.value;

        // Find existing user
        let user = await AuthModel.findOne({ email });

        if(!user) return done("user is not signup already", null)
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

