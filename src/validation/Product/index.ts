import InvariantError from "../../utils/exceptions/InvariantError";

import {
  createProductSchema,
  getAllProductSchema,
  updateProductSchema,
} from "./schema";

interface ProductPayload {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  image_url?: string;
}

const ProductValidation = {
  validateCreateProduct(payload: ProductPayload): void {
    const { error } = createProductSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
  validateGetAllProduct(payload: ProductPayload): void {
    const { error } = getAllProductSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
  validateUpdateProduct(payload: ProductPayload): void {
    const { error } = updateProductSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default ProductValidation;
