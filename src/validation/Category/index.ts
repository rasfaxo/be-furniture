import InvariantError from "../../utils/exceptions/InvariantError";
import { createCategorySchema } from "./schema";

interface CategoryPayload {
  id?: number;
  name: string;
  description?: string;
}

const CategoryValidation = {
  validateCategoryPayload(payload: CategoryPayload): void {
    const { error } = createCategorySchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default CategoryValidation;
