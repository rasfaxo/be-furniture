import InvariantError from "../../utils/exceptions/InvariantError";
import {
  createMitraSchema,
  updateMitraSchema,
  getMitraByIdSchema,
} from "./schema";

interface MitraPayload {
  id?: number;
  user_id: number;
  company_name: string;
  business_type: string;
  address?: string;
  contact_info: string;
}

const MitraValidation = {
  validatePayloadMitra(payload: MitraPayload): void {
    const { error } = createMitraSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateMitra(payload: MitraPayload): void {
    const { error } = updateMitraSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateGetMitraById(payload: { id: number }): void {
    const { error } = getMitraByIdSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default MitraValidation;
