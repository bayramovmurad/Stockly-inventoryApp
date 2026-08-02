"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-600">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Sign in
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Access your inventory dashboard and continue where you left off.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 placeholder:text-slate-400"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-slate-500 transition hover:text-emerald-600">
              Forgot password?
            </button>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              Account access
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
