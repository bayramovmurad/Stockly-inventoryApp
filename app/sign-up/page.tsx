import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_30%)]" />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between border-r border-white/10 p-12 xl:p-16">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
              InventoryOS
            </div>

            <div className="mt-10 max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
                Create your workspace and run inventory with confidence.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Start with a clean setup for products, warehouse operations,
                purchasing, and reporting in one place.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xl">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Live stock view</p>
              <p className="mt-2 text-sm text-slate-400">
                Track quantity and movement clearly.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Smart records</p>
              <p className="mt-2 text-sm text-slate-400">
                Keep product data organized from day one.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:hidden">
              <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                InventoryOS
              </div>
            </div>

            <SignUpForm />

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-slate-400 transition hover:text-white">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
