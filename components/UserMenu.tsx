"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending || !session) {
    return <div className="h-10 w-full animate-pulse bg-gray-800 rounded-lg" />;
  }

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {session.user.name}
        </p>
        <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
      </div>
      <button
        onClick={handleSignOut}
        title="Sign out"
        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 shrink-0">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
