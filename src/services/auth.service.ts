import User from "src/models/User.model";
import { UserDto, UserSignUpData } from "src/types/user.type";
import bcrypt from "bcryptjs";
import { ETokenType, TokenResponse } from "src/types/auth.type";
import JWT from "jsonwebtoken";
import Session from "src/models/Session.model";

const authServices = {
  encodedToken(userId: any, username: string, tokenType: ETokenType): string {
    return JWT.sign(
      {
        sub: userId,
        iss: username,
      },
      tokenType === ETokenType.ACCESS_TOKEN
        ? process.env.JWT_SECRET_ACCESS_TOKEN!
        : process.env.JWT_SECRET_REFRESH_TOKEN!,
      {
        expiresIn:
          tokenType === ETokenType.ACCESS_TOKEN
            ? Number(process.env.ACCESS_TOKEN_LIFE)
            : Number(process.env.REFRESH_TOKEN_LIFE),
      }
    );
  },
  async signUp(user: UserSignUpData): Promise<UserDto> {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      // generate a password hash (salt + hash)
      const passwordHashed = await bcrypt.hash(user.password, salt);
      // re-assign password hashed
      user.password = passwordHashed;
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw err;
    }
  },

  async login(user: UserDto) {
    try {
      const accessToken: string = this.encodedToken(
        user?._id,
        user?.email,
        ETokenType.ACCESS_TOKEN
      );

      let tokenResponse: TokenResponse = {
        accessToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      const userToken = await Session.findOne({
        userId: user?._id,
      });

      if (userToken) {
        tokenResponse["refreshToken"] = userToken.token as string;
      } else {
        const refreshToken: string = this.encodedToken(
          user?._id,
          user?.email,
          ETokenType.REFRESH_TOKEN
        );

        await Session.create({
          userId: user?._id,
          token: refreshToken,
          expireAt: new Date(
            Date.now() + Number(process.env.REFRESH_TOKEN_LIFE)
          ),
        });

        tokenResponse["refreshToken"] = refreshToken;
      }

      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      let tokenResponse: TokenResponse = {
        refreshToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      JWT.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        (err: any, decoded: any) => {
          if (err) {
            throw err;
          } else {
            tokenResponse["accessToken"] = this.encodedToken(
              decoded.sub,
              decoded.iss,
              ETokenType.ACCESS_TOKEN
            );
          }
        }
      );
      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },
};

export default authServices;
