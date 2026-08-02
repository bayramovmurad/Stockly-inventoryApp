import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
            InventoryOS
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/sign-in"
              className="text-sm text-slate-300 transition hover:text-white">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Get Started
            </Link>
          </nav>
        </header>

        <main className="flex flex-1 items-center">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
                Smart inventory management
              </p>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Keep stock, sales, and operations under control.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Manage products, monitor stock levels, and track movement with a
                clean system designed for growing inventory workflows.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="rounded-2xl bg-emerald-500 px-8 py-4 text-center font-semibold text-white transition hover:bg-emerald-600">
                  Start Free
                </Link>

                <Link
                  href="/sign-in"
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center font-semibold text-slate-200 backdrop-blur-sm transition hover:bg-white/10 hover:text-white">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[24px] bg-white p-6 text-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-sm text-slate-500">Current stock</p>
                      <h2 className="text-2xl font-bold">24,580 units</h2>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      +12.4%
                    </span>
                  </div>

                  <div className="grid gap-4 py-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Products</p>
                      <p className="mt-2 text-2xl font-bold">1,248</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Low stock</p>
                      <p className="mt-2 text-2xl font-bold">18</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Warehouses</p>
                      <p className="mt-2 text-2xl font-bold">6</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Orders today</p>
                      <p className="mt-2 text-2xl font-bold">143</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      Inventory health
                    </p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Stable stock coverage across active items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
