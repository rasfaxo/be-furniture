import { Category_name } from "@prisma/client";
import { CategoriesModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Category = Prisma.Category;

class CategoryService {
  #categoryModel: typeof CategoriesModels;

  constructor(categoryModel: typeof CategoriesModels) {
    this.#categoryModel = categoryModel;
  }

  async createCategory(category_name: Category_name): Promise<Category> {
    return await this.#categoryModel.create({
      data: {
        category_name,
      },
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.#categoryModel.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image_url: true,
            description: true,
            price: true,
            stock: true,
          },
        },
      },
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.#categoryModel.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image_url: true,
            description: true,
            price: true,
            stock: true,
          },
        },
      },
    });
  }

  async getCategoryByName(
    category_name: Category_name
  ): Promise<Category | null> {
    return await this.#categoryModel.findFirst({
      where: { category_name },
    });
  }

  async updateCategory(
    id: number,
    data: Partial<Category>
  ): Promise<Category | null> {
    return await this.#categoryModel.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.#categoryModel.delete({
      where: { id },
    });
  }
}

const categoryService = new CategoryService(CategoriesModels);

export default categoryService;
