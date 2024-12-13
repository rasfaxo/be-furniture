import { CartItemsModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type CartItem = Prisma.CartItem;

class CartItemService {
  #cartItemModel: typeof CartItemsModels;
  constructor(cartItemModel: typeof CartItemsModels) {
    this.#cartItemModel = cartItemModel;
  }

  async getCartItemById(id: number): Promise<CartItem | null> {
    return await this.#cartItemModel.findUnique({
      where: {
        id,
      },
    });
  }
  async getAllCartItem(
    skip: number,
    limit: number,
    filter: any
  ): Promise<CartItem[]> {
    return await this.#cartItemModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
    });
  }

  async createCartItem(
    cart_id: number,
    product_id: number,
    quantity: number,
    subtotal_price: number
  ): Promise<CartItem> {
    return await this.#cartItemModel.create({
      data: {
        cart_id,
        product_id,
        quantity,
        subtotal_price,
      },
    });
  }

  async updateCartItemById(
    id: number,
    data: Partial<CartItem>
  ): Promise<CartItem | null> {
    return await this.#cartItemModel.update({
      where: { id },
      data,
    });
  }

  async deleteCartItemById(id: number): Promise<void> {
    await this.#cartItemModel.delete({
      where: { id },
    });
  }

  async countTotalDataCart(): Promise<number> {
    return await this.#cartItemModel.count();
  }
}

const cartItemService = new CartItemService(CartItemsModels);

export default cartItemService;
