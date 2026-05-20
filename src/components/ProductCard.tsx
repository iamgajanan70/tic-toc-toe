'use client'

import { Mango } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  mango: Mango;
  onAddToCart: (mango: Mango) => void;
}

export function ProductCard({ mango, onAddToCart }: ProductCardProps) {
  return (
    <div className={cn("neo-card flex flex-col h-full", mango.color)}>
      <div className="flex-1">
        <h3 className="font-lexend text-3xl mb-2 uppercase tracking-tighter leading-none">
          {mango.name}
        </h3>
        <p className="font-lexend text-xl font-black mb-4">
          ${mango.price.toFixed(2)} / {mango.unit}
        </p>
        <p className="font-mono text-sm leading-tight mb-8">
          {mango.description}
        </p>
      </div>

      <button
        onClick={() => onAddToCart(mango)}
        className={cn(
          "neo-button w-full text-lg",
          mango.accent
        )}
      >
        ADD TO BASKET
      </button>
    </div>
  );
}
