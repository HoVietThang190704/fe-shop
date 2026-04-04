import React from "react";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Navbar with transparent support for the hero */}
      <Navbar transparent />
      <main className="flex-1">{children}</main>
      
      {/* Footer Placeholder for completeness */}
      <footer className="border-t bg-muted/40 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="flex flex-col space-y-6">
               <span className="text-xl font-serif font-bold tracking-tighter">MEN&apos;S</span>
               <p className="text-sm font-medium text-muted-foreground/80 max-w-xs transition-colors hover:text-foreground">
                Defining modern menswear for every occasion with a focus on quality, comfort, and timeless style.
               </p>
            </div>
            {/* Quick links etc. dummy */}
            <div className="flex flex-col space-y-4">
               <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Shop</h4>
               <div className="flex flex-col space-y-2 text-sm font-medium text-muted-foreground transition-colors">
                  <span className="hover:text-primary">Clothing</span>
                  <span className="hover:text-primary">Footwear</span>
                  <span className="hover:text-primary">Accessories</span>
                  <span className="hover:text-primary">New Arrivals</span>
               </div>
            </div>
            <div className="flex flex-col space-y-4">
               <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Support</h4>
               <div className="flex flex-col space-y-2 text-sm font-medium text-muted-foreground transition-colors">
                  <span className="hover:text-primary">Customer Service</span>
                  <span className="hover:text-primary">Shipping & Returns</span>
                  <span className="hover:text-primary">Privacy Policy</span>
                  <span className="hover:text-primary">Terms of Use</span>
               </div>
            </div>
            <div className="flex flex-col space-y-4">
               <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Newsletter</h4>
               <p className="text-sm font-medium text-muted-foreground italic">Sign up to get 10% off your first order.</p>
               <div className="flex space-x-2">
                  <input className="h-10 flex-grow rounded-full border bg-transparent px-4 text-sm font-medium transition-all focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Email address" />
                  <button className="h-10 rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-md">Join</button>
               </div>
            </div>
          </div>
          <div className="mt-20 border-t pt-8 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground/60 transition-colors">
            &copy; 2026 MEN&apos;S FASHION. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
