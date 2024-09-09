"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { memo } from "react";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  const handleBack = () => router.back();

  const MemoizedChevronLeft = memo(ChevronLeft);

  return (
    <Button
      className="flex-shrink-0"
      onClick={handleBack}
      size={"icon"}
      variant={"outline"}
    >
      <MemoizedChevronLeft size={24} />
    </Button>
  );
}
