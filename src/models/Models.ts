import { PrismaClient } from "@prisma/client";

export const UsersModels = new PrismaClient().user;
export const ProductsModels = new PrismaClient().product;
export const CategoriesModels = new PrismaClient().category;
export const OrdersModels = new PrismaClient().order;
export const OrderItemsModels = new PrismaClient().order_Item;
export const PaymentsModels = new PrismaClient().payment;
export const ReviewsModels = new PrismaClient().review;
export const CartsModels = new PrismaClient().cart;
export const CartItemsModels = new PrismaClient().cart_Item;
export const ShippingModels = new PrismaClient().shipping;
