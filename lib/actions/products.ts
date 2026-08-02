"use server";

import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });
  revalidatePath("/inventory");
}

// Yeni yaratma (create) funksiyamız (Yönləndirməsiz, sadəcə obyekt qaytarır)
export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    return { success: false, message: "Validation failed. Please check the inputs." };
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });


    return { success: true, message: "Inventory created successfully" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {

    if (error.code === "P2002") {
      return { success: false, message: "This SKU already exists. Please use a different one." };
    }
    return { success: false, message: "An error occurred. Please try again." };
  }
}