"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddItemForm } from "@/components/add-item-form";
import { RouteGuard } from "@/components/auth/route-guard";

export default function AddPage() {
  const router = useRouter();

  function goToList() {
    router.push("/list");
  }

  return (
    <RouteGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="relative flex h-[50px] shrink-0 items-center justify-center border-b-[0.5px] border-border px-4">
          <Link href="/list" className="absolute left-4 text-lg text-foreground">
            ←
          </Link>
          <p className="text-[15px] font-medium text-foreground">항목 추가</p>
        </header>
        <div className="mx-auto w-full max-w-md flex-1">
          <AddItemForm onCancel={goToList} onSubmit={goToList} />
        </div>
      </div>
    </RouteGuard>
  );
}
