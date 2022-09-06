import { LoginSessionInfo } from "../auth.type";

declare global {
  namespace Express {
    interface User extends LoginSessionInfo {}
  }
}
