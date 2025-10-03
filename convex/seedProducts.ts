import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    const demoProducts = [
      {
        name: "Ethiopian Yirgacheffe",
        description: "Bright and floral with notes of blueberry and jasmine. A light roast that showcases the unique terroir of Ethiopia's coffee-growing regions.",
        price: 1899, // $18.99
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
        origin: "Ethiopia",
        roastType: "Light",
        dietaryProfile: {
          nonDairy: true,
          glutenFree: true,
        },
        inStock: true,
        createdAt: Date.now(),
      },
      {
        name: "Colombian Supremo",
        description: "Well-balanced medium roast with chocolate and caramel notes. Smooth body with a clean, sweet finish.",
        price: 1649, // $16.49
        imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
        origin: "Colombia",
        roastType: "Medium",
        dietaryProfile: {
          nonDairy: true,
          glutenFree: true,
        },
        inStock: true,
        createdAt: Date.now(),
      },
      {
        name: "Sumatra Mandheling",
        description: "Bold and earthy dark roast with herbal notes and full body. Low acidity with a syrupy mouthfeel.",
        price: 1799, // $17.99
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
        origin: "Indonesia",
        roastType: "Dark",
        dietaryProfile: {
          nonDairy: true,
          glutenFree: true,
        },
        inStock: true,
        createdAt: Date.now(),
      },
      {
        name: "Costa Rican Tarrazu",
        description: "Crisp and clean with bright citrus notes. Medium roast highlighting the high-altitude growing conditions.",
        price: 1749, // $17.49
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        origin: "Costa Rica",
        roastType: "Medium",
        dietaryProfile: {
          nonDairy: true,
          glutenFree: true,
        },
        inStock: true,
        createdAt: Date.now(),
      },
    ];

    for (const product of demoProducts) {
      await ctx.db.insert("products", product);
    }

    return { success: true, count: demoProducts.length };
  },
});