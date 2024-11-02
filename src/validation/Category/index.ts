import InvariantError from "../../utils/exceptions/InvariantError";
import { createCategorySchema, updateCategorySchema } from "./schema";

interface CategoryPayload {
  id?: number;
  category_name: string;
}

const CategoryValidation = {
  validateCategoryPayload(payload: CategoryPayload): void {
    const { error } = createCategorySchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateCategory(payload: CategoryPayload): void {
    const { error } = updateCategorySchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default CategoryValidation;
