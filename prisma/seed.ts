import { Category_name, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryData = [
    { category_name: "Chair" },
    { category_name: "Table" },
    { category_name: "Bed" },
    { category_name: "Sofa" },
    { category_name: "Wardrobe" },
];

async function seedCategory() {
    try {
        const existingCategories = await prisma.category.findMany();
        const existingCategoryNames = existingCategories.map((category) => category.category_name);

        const newCategories = categoryData.filter(
            (category) => !existingCategoryNames.includes(category.category_name as Category_name)
        ).map(category => ({
            category_name: category.category_name as Category_name,
        }));
        
        if (newCategories.length > 0) {
            const result = await prisma.category.createMany({
                data: newCategories,
                skipDuplicates: true,
            });

            console.log(`${result.count} kategori baru berhasil dibuat`);
        } else {
            console.log("Tidak ada kategori baru untuk dibuat");
        }
    } catch (error) {
        console.error("Error seeding category:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedCategory();
