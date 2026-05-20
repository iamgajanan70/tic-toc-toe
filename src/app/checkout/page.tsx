'use client'

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet, Bitcoin, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsFinished(true);
      clearCart();
    }, 2000);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-neo-teal flex items-center justify-center p-4">
        <div className="neo-card max-w-2xl w-full text-center py-20">
          <CheckCircle2 size={80} className="mx-auto mb-6 text-black" />
          <h1 className="font-lexend text-6xl font-black uppercase mb-4 tracking-tighter">ORDER CONFIRMED</h1>
          <p className="font-mono text-xl mb-10">Your mangoes are being plucked as we speak. Check your email for tracking.</p>
          <Link href="/" className="neo-button bg-neo-yellow text-xl">
            GO BACK HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 font-mono font-bold uppercase mb-8 hover:underline">
          <ArrowLeft size={20} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Form */}
          <div>
            <div className="flex gap-4 mb-8">
              <div className={cn(
                "neo-border px-4 py-2 font-lexend font-black",
                step === 1 ? "bg-neo-yellow" : "bg-gray-200"
              )}>01 SHIPPING</div>
              <div className={cn(
                "neo-border px-4 py-2 font-lexend font-black",
                step === 2 ? "bg-neo-yellow" : "bg-gray-200"
              )}>02 PAYMENT</div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono font-bold uppercase">Full Name</label>
                  <input required type="text" placeholder="JOHN MANGO" className="neo-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono font-bold uppercase">Email Address</label>
                  <input required type="email" placeholder="MANGO@EXAMPLE.COM" className="neo-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono font-bold uppercase">Shipping Address</label>
                  <input required type="text" placeholder="123 FRUIT LANE" className="neo-input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono font-bold uppercase">City</label>
                    <input required type="text" placeholder="RATNAGIRI" className="neo-input" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono font-bold uppercase">Zip Code</label>
                    <input required type="text" placeholder="415612" className="neo-input" />
                  </div>
                </div>
                <button type="submit" className="neo-button w-full bg-neo-orange text-xl mt-4">
                  NEXT: PAYMENT
                </button>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'pay', label: 'Apple/Google Pay', icon: Wallet },
                    { id: 'crypto', label: 'Crypto', icon: Bitcoin },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "neo-card flex items-center justify-between transition-all",
                        paymentMethod === method.id ? "bg-neo-teal -translate-x-1 -translate-y-1 shadow-[6px_6px_0px_0px_#000]" : "bg-white"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <method.icon size={24} />
                        <span className="font-lexend font-black uppercase text-xl">{method.label}</span>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-full neo-border flex items-center justify-center",
                        paymentMethod === method.id ? "bg-black" : "bg-white"
                      )}>
                        {paymentMethod === method.id && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono font-bold uppercase">Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="neo-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono font-bold uppercase">EXP</label>
                        <input type="text" placeholder="MM/YY" className="neo-input" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-mono font-bold uppercase">CVV</label>
                        <input type="text" placeholder="123" className="neo-input" />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="neo-button w-full bg-neo-pink hover:bg-neo-teal text-3xl py-6 relative overflow-hidden hover:animate-pulse"
                >
                  {isProcessing ? "PROCESSING..." : "CONFIRM & PAY"}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/10 animate-pulse" />
                  )}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full font-mono font-bold uppercase underline"
                >
                  Go Back to Shipping
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="neo-card bg-neo-purple/10">
              <h2 className="font-lexend text-3xl font-black uppercase mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between font-mono">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="neo-border border-x-0 border-b-0 pt-6">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-xl font-bold uppercase">Total Due:</span>
                  <span className="font-lexend text-5xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
