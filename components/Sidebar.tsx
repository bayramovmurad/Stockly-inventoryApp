import { BarChart3, Package, Plus, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/dashboard" className="block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">
                Inventory
              </p>
              <h1 className="text-base font-semibold text-white">
                InventoryOS
              </h1>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.href;

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`group flex items-center justify-between rounded-2xl px-3 py-3 transition ${
                  isActive
                    ? "bg-white/10 text-white ring-1 ring-white/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                    }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-medium">{item.name}</span>
                </div>

                <ChevronRight
                  className={`h-4 w-4 transition ${
                    isActive
                      ? "text-slate-300"
                      : "text-slate-600 group-hover:text-slate-400"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl bg-white/5 p-2">
          <UserMenu />
        </div>
      </div>
    </aside>
  );
}
