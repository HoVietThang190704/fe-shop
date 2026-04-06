import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Maximize2 } from "lucide-react";
import { HOME_CONTENT } from "@/lib/constants/home-content";
import { ProductService } from "@/service/product.service";
import { FavoriteToggleButton } from "@/components/favorites/favorite-toggle-button";
import { Product } from "@/lib/interface/product.interface";

type DisplayProduct = Product & {
  isNew?: boolean;
  isSale?: boolean;
};

export async function TrendingSection() {
  const { title } = HOME_CONTENT.trending;
  const productService = ProductService.getInstance();
  const response = await productService.getProducts();
  
  const products: DisplayProduct[] =
    response.success && response.data ? response.data.slice(0, 4) : [];

  if (products.length === 0) {
    return null; // Or show a fallback
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
      {/* Section Header */}
      <div className="mb-16 flex items-center space-x-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
          {title}
        </h2>
        <div className="h-[1px] flex-grow bg-border/60" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {products.map((product) => (
          <Link 
            key={product._id} 
            href={`/product/${product.slug}`}
            className="group relative flex flex-col space-y-5"
          >
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted/20 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:scale-[1.02]">
              <Image
                src={product.images[0] || "/images/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col space-y-2">
                {/* Mocking badges for now as they are not in the database */}
                {product.isNew && (
                  <span className="rounded-full bg-primary/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg backdrop-blur-sm">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="rounded-full bg-destructive/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground shadow-lg backdrop-blur-sm">
                    Sale
                  </span>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-x-4 bottom-4 flex translate-y-12 items-center justify-between space-x-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <button className="flex h-11 flex-grow items-center justify-center rounded-full bg-white/95 text-black font-semibold text-sm shadow-xl backdrop-blur-md transition-all hover:bg-black hover:text-white active:scale-95">
                  Add to Cart
                </button>
                <div className="flex space-x-2">
                  <FavoriteToggleButton
                    productId={product._id}
                    productName={product.title}
                    className="h-11 w-11 rounded-full bg-white/95 text-black shadow-xl backdrop-blur-md hover:bg-primary hover:text-white"
                  />
                  <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-xl backdrop-blur-md transition-all hover:bg-primary hover:text-white active:scale-95">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight text-foreground transition-all group-hover:text-primary line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex items-center">
                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                   <span className="ml-1 text-xs font-bold text-muted-foreground">5.0</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                 <span className="text-lg font-bold tracking-tighter text-foreground">${product.price}</span>
                  {product.isSale && (
                    <span className="text-sm font-medium text-muted-foreground line-through opacity-60">${product.price + 50}</span>
                 )}
              </div>

              {/* Color variants dummy */}
              <div className="flex space-x-2 pt-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-3 w-3 rounded-full bg-stone-300 ring-1 ring-offset-2 ring-stone-300" />
                <div className="h-3 w-3 rounded-full bg-slate-800" />
                <div className="h-3 w-3 rounded-full bg-stone-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
