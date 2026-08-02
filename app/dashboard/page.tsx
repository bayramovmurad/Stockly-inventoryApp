import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AlertTriangle, DollarSign, Package2, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: {
        name: true,
        price: true,
        quantity: true,
        lowStockAt: true,
        createdAt: true,
      },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1,
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0,
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  const now = new Date();
  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0",
    )}/${String(weekStart.getDate()).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar currentPath="/dashboard" />

      <main className="ml-72 min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-emerald-600">Overview</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Welcome back. Here’s a clear view of your inventory performance.
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Products</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {totalProducts}
                  </h2>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <Package2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-emerald-600">
                <TrendingUp className="mr-1 h-4 w-4" />
                Active inventory count
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Value</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    ${Number(totalValue).toFixed(0)}
                  </h2>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Estimated stock value
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Low Stock</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {lowStock}
                  </h2>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-sm text-amber-600">
                Items needing attention
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">In Stock Rate</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {inStockPercentage}%
              </h2>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${inStockPercentage}%` }}
                />
              </div>
              <div className="mt-3 text-sm text-slate-500">
                Healthy stock coverage
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    New products per week
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Last 12 weeks activity
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Stock distribution
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current inventory health
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">In Stock</span>
                    <span className="font-medium text-slate-900">
                      {inStockPercentage}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-emerald-500"
                      style={{ width: `${inStockPercentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Low Stock</span>
                    <span className="font-medium text-slate-900">
                      {lowStockPercentage}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-amber-500"
                      style={{ width: `${lowStockPercentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Out of Stock</span>
                    <span className="font-medium text-slate-900">
                      {outOfStockPercentage}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-rose-500"
                      style={{ width: `${outOfStockPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    In Stock
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {inStockCount}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Low
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {lowStockCount}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Empty
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {outOfStockCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest added inventory items
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const dotColors = [
                  "bg-rose-500",
                  "bg-amber-500",
                  "bg-emerald-500",
                ];

                const badgeStyles = [
                  "bg-rose-50 text-rose-700",
                  "bg-amber-50 text-amber-700",
                  "bg-emerald-50 text-emerald-700",
                ];

                const stockLabels = ["Out of stock", "Low stock", "Healthy"];

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${dotColors[stockLevel]}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Recently added product
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[stockLevel]}`}>
                        {stockLabels[stockLevel]}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {product.quantity} units
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
