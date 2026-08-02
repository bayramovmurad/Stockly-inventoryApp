import Sidebar from "@/components/Sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package2, Plus, Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import ToastMessage from "@/components/ToastMessage"; 


export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string, toast: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-slate-950">
      {params?.toast === "success" && (
        <ToastMessage
          type="success"
          message="Inventory created successfully!"
        />
      )}
      <Sidebar currentPath="/inventory" />

      <main className="ml-72 min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex flex-col gap-4 px-8 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Inventory</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Products
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage your products and track inventory levels.
              </p>
            </div>

            <Link
              href="/add-product"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Total products</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {totalCount}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Search query</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                {q || "All products"}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Page</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {page}
                <span className="ml-1 text-lg font-medium text-slate-400">
                  / {totalPages}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <form
              action="/inventory"
              method="GET"
              className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search products..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">
                Search
              </button>
            </form>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Product list
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {totalCount} item{totalCount === 1 ? "" : "s"} found
                </p>
              </div>

              <div className="hidden rounded-2xl bg-slate-50 p-3 text-slate-500 md:block">
                <Package2 className="h-5 w-5" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Low Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {items.map((product) => {
                    const threshold = product.lowStockAt ?? 5;
                    const stockLevel =
                      product.quantity === 0
                        ? "out"
                        : product.quantity <= threshold
                          ? "low"
                          : "healthy";

                    const badgeStyles = {
                      out: "bg-rose-50 text-rose-700",
                      low: "bg-amber-50 text-amber-700",
                      healthy: "bg-emerald-50 text-emerald-700",
                    };

                    const badgeLabels = {
                      out: "Out of stock",
                      low: "Low stock",
                      healthy: "Healthy",
                    };

                    return (
                      <tr key={product.id} className="hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">
                              {product.name}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {product.sku || "-"}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          ${Number(product.price).toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {product.quantity}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {product.lowStockAt || "-"}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              badgeStyles[stockLevel]
                            }`}>
                            {badgeLabels[stockLevel]}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <form
                            action={async (formData: FormData) => {
                              "use server";
                              await deleteProduct(formData);
                            }}>
                            <input type="hidden" name="id" value={product.id} />
                            <button className="font-medium text-rose-600 transition hover:text-rose-700">
                              Delete
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-base font-medium text-slate-900">
                  No products found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different search or add a new product.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing {(page - 1) * pageSize + (items.length ? 1 : 0)}-
                {(page - 1) * pageSize + items.length} of {totalCount}
              </p>
              {totalPages > 1 && (
                <div className="">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl="/inventory"
                    searchParams={{
                      q,
                      pageSize: String(pageSize),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
