"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const {setIsAuth} = useStore()

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/verify", {
          method: "GET",
          credentials: "include", // تا کوکی ارسال شود
        });

        if (res.status === 200) {
          setIsAuth(res.status === 200);
        }
        if (res.status !== 200) {
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);

  return <>{children}</>;
}