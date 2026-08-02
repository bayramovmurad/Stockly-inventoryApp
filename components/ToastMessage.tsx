"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";


interface ToastProps {
  type: "success" | "error";
  message: string;
}

export default function ToastMessage({ type, message }: ToastProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const toastOptions = { toastId: message };

    if (type === "success") {
      toast.success(message, toastOptions);
    } else if (type === "error") {
      toast.error(message, toastOptions);
    }

    // Mesaj çıxdıqdan sonra URL-i təmizləyirik
    router.replace(pathname, { scroll: false });
  }, [type, message, router, pathname]);

  return null;
}
