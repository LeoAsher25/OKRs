import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "src/models/User.model";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
    },
    async (payload, done) => {
      try {
        const user = await User.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(payload.sub),
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ]);

        if (!user[0]) {
          return done(null, false);
        }
        done(null, user[0]);
      } catch (error) {
        console.log("err: ", error);
        done(error, false);
      }
    }
  )
);
