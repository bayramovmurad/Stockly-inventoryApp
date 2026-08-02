import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Product.userId is now a foreign key into the `user` table (Better
    // Auth), so we need a real user row to attach the demo products to.
    const demoUser = await prisma.user.upsert({
        where: { email: "demo@example.com" },
        update: {},
        create: {
            id: "demo-user-123",
            email: "demo@example.com",
            name: "Demo User",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Create sample products
    await prisma.product.createMany({
        data: Array.from({ length: 25 }).map((_, i) => ({
            userId: demoUser.id,
            name: `Product ${i + 1}`,
            price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
        })),
    });

    console.log("Seed data created successfully!");
    console.log(`Created 25 products for user: ${demoUser.email} (${demoUser.id})`);
    console.log(
        "Note: this demo user has no password set. Sign up separately with"
    );
    console.log(
        "demo@example.com through /sign-up, or use `auth.api.setPassword` to set one."
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });