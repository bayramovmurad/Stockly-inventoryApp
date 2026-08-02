import Sidebar from "@/components/Sidebar";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";
import { PackagePlus } from "lucide-react";

export default async function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar currentPath="/add-product" />

      <main className="ml-72 min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-emerald-600">Inventory</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Add Product
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Add a new item to your inventory with pricing and stock details.
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-start gap-4">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <PackagePlus className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Product information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill in the core details for the new inventory item.
                  </p>
                </div>
              </div>

              <form className="space-y-6" action={createProduct}>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter product name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      required
                      placeholder="0"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Price *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sku"
                    className="mb-2 block text-sm font-medium text-slate-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    placeholder="Enter SKU"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lowStockAt"
                    className="mb-2 block text-sm font-medium text-slate-700">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    id="lowStockAt"
                    name="lowStockAt"
                    min="0"
                    placeholder="Enter low stock threshold"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="rounded-2xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700">
                    Add Product
                  </button>

                  <Link
                    href="/inventory"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-100">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Quick tips
                </h3>
                <div className="mt-4 space-y-4 text-sm text-slate-500">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Use clear product names so search and reporting stay clean.
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Add a SKU when possible for faster lookup and stock control.
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Set a low stock threshold to catch shortages early.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Suggested defaults
                </h3>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">
                      Starting quantity
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Set the currently available stock before publishing.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">
                      Price format
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Use decimal values like 24.99 for consistent totals.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">
                      Threshold
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      A low stock value like 5 or 10 works well for alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
