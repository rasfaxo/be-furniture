import { CategoriesModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Category = Prisma.Category;

class CategoryService {
    #categoryModel: typeof CategoriesModels;

    constructor(categoryModel: typeof CategoriesModels) {
        this.#categoryModel = categoryModel;
    }

    async createCategory(name: string, description?: string): Promise<Category> {
        return await this.#categoryModel.create({
            data: {
                name,
                description,
            },
        });
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return await this.#categoryModel.findUnique({
            where: { id },
        });
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.#categoryModel.findMany();
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        return await this.#categoryModel.findFirst({
            where: { name },
        });
    }

    async updateCategory(id: number, data: Partial<Category>): Promise<Category | null> {
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
