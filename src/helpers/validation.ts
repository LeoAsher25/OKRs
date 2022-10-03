import mongoose from 'mongoose';

const ValidationHelper = {
  email: /^[\w\.]+@([\w]+\.)+[\w]{2,7}$/,
  password: /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  phoneNumber: /(\+84|0[3|5|7|8|9])([0-9]{8})\b/g,
  date: (date: string | Date) => {
    return new Date(date).getTime() > 0;
  },
  objectId: (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
      if (String(new mongoose.Types.ObjectId(id)) === id) return true;
      return false;
    }
    return false;
  },
  isNumeric(value: string) {
    return /^\d+$/.test(value);
  }
};
export default ValidationHelper;
