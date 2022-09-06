import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "src/models/user.model";
import { LoginSessionInfo } from "src/types/auth.type";

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
        const loginSessionId: LoginSessionInfo = {
          _id: user[0]._id,
          email: user[0].email,
        };
        done(null, loginSessionId);
      } catch (error) {
        console.log("err: ", error);
        done(error, false);
      }
    }
  )
);
