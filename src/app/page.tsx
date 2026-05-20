'use client'

import { useState } from 'react';
import { MANGOES } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingBasket, X, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Home() {
  const { items, addItem, updateQuantity, total, count } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="neo-border border-t-0 border-x-0 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="font-lexend text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
            Mango Mania
          </h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="neo-button bg-neo-teal flex items-center gap-2"
          >
            <ShoppingBasket size={24} />
            <span className="hidden md:inline">Basket</span>
            <span>({count})</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-neo-yellow neo-border border-t-0 border-x-0 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="font-lexend text-6xl md:text-8xl font-black uppercase leading-none mb-8 tracking-tighter">
              Freshness that <span className="bg-black text-neo-yellow px-2 italic">HITS HARD</span>
            </h2>
            <p className="font-mono text-xl md:text-2xl font-bold max-w-2xl">
              Unapologetically premium mangoes sourced directly from the world's most elite orchards. No fluff. Just fruit.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MANGOES.map(mango => (
            <ProductCard
              key={mango.id}
              mango={mango}
              onAddToCart={(m) => {
                addItem(m);
                setIsCartOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-50 transition-opacity",
        isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsCartOpen(false)}>
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-md bg-white neo-border border-r-0 transition-transform duration-300 ease-in-out",
            isCartOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 neo-border border-t-0 border-x-0 flex justify-between items-center bg-neo-orange">
              <h2 className="font-lexend text-3xl font-black uppercase">Your Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="neo-button bg-white p-2">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className="font-mono text-xl text-center py-20">Your basket is empty. Go get some mangoes!</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="neo-card flex gap-4 items-center bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-lexend text-xl font-bold uppercase">{item.name}</h4>
                      <p className="font-mono text-sm">${item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="neo-button p-1 bg-neo-teal"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="font-lexend text-2xl font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="neo-button p-1 bg-neo-teal"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 neo-border border-b-0 border-x-0 bg-white">
              <div className="flex justify-between items-end mb-6">
                <span className="font-mono text-lg font-bold">Total:</span>
                <span className="font-lexend text-5xl font-black">${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className={cn(
                  "neo-button w-full bg-neo-yellow text-2xl py-4 text-center block",
                  items.length === 0 && "opacity-50 pointer-events-none"
                )}
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
