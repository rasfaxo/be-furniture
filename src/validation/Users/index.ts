import InvariantError from "../../utils/exceptions/InvariantError";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from "./schema";

interface UserPayload {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  address?: string;
  role?: string;
  newPassword?: string;
  oldPassword?: string;
  mitra_id?:number;
}

const UserValidation = {
  validatePayloadUser(payload: UserPayload): void {
    const { error } = createUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateLoginUser(payload: UserPayload): void {
    const { error } = loginUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateUser(payload: UserPayload): void {
    const { error } = updateUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateChangePassword(payload: UserPayload): void {
    const { error } = changePasswordSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default UserValidation;
