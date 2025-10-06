import React from "react";
import { cn } from "@/lib/utils";

export default function GridSmallBackgroundDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-16 w-full items-center justify-center bg-white dark:bg-[#18181b]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,rgba(228,228,231,0.4)_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.6)_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#18181b]"></div>
      <div className="relative z-20 bg-clip-text ">
        {children}
      </div>
    </div>
  );
}
