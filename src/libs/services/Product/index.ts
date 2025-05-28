import { ProductsModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Product = Prisma.Product;

class ProductService {
  #productModel: typeof ProductsModels;
  constructor(productModel: typeof ProductsModels) {
    this.#productModel = productModel;
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.#productModel.findUnique({
      where: { id },
      include: {
        cartItems: {
          select: {
            id: true,
            quantity: true,
            subtotal_price: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            order_id: true,
            quantity: true,
            price: true,
          },
        },
        reviews: true,
      },
    });
  }

  async getAllProduct(
    skip: number,
    limit: number,
    filter: any
  ): Promise<Product[]> {
    return await this.#productModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
      include: {
        cartItems: {
          select: {
            id: true,
            quantity: true,
            subtotal_price: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            order_id: true,
            quantity: true,
            price: true,
          },
        },
        reviews: true,
      },
    });
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    category_id: number,
    image_url: string
  ): Promise<Product> {
    return await this.#productModel.create({
      data: {
        name,
        description,
        price,
        stock,
        category_id,
        image_url,
      },
    });
  }

  async updateProductById(
    id: number,
    data: Partial<Product>
  ): Promise<Product | null> {
    return await this.#productModel.update({
      where: { id },
      data,
    });
  }

  async deleteProductById(id: number): Promise<void> {
    await this.#productModel.delete({
      where: { id },
    });
  }

  async countTotalDataProduct(): Promise<number> {
    return await this.#productModel.count();
  }
}

const productService = new ProductService(ProductsModels);

export default productService;
