import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from "lucide-react";
import { ProductService } from "@/service/product.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductActions } from "@/components/product/product-actions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const productService = ProductService.getInstance();
  const response = await productService.getProductBySlug(slug);

  if (!response.success || !response.data) {
    notFound();
  }

  const product = response.data;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <main className="container mx-auto max-w-7xl px-6 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted/20 shadow-2xl border border-border/50">
              <Image
                src={product.images[0] || "https://placehold.co/800x1000"}
                alt={product.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-none px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                  New Arrival
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-muted/20 cursor-pointer border border-transparent hover:border-primary transition-all group">
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Detail */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {product.category?.name || "Premium Collection"}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                  {product.title}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-yellow-400/10 px-3 py-1 rounded-full">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1.5 text-xs font-bold text-yellow-500">4.9 (128 reviews)</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">In Stock</span>
              </div>

              <div className="flex items-baseline space-x-4">
                <p className="text-4xl font-bold tracking-tighter">
                  ${product.price}
                </p>
                <p className="text-lg text-muted-foreground line-through opacity-40 font-medium">
                  ${product.price + 80}
                </p>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed font-light">
                {product.description || "Crafted from superior materials, this piece embodies modern elegance and timeless style. A perfect addition to your curated wardrobe."}
              </p>
            </div>

            <Separator className="bg-border/60" />

            {/* Action Buttons */}
            <ProductActions productId={product._id} productName={product.title} />

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-6 pt-6">
              <div className="flex items-start space-x-4 p-4 rounded-3xl bg-muted/10 border border-border/30">
                <div className="bg-primary/10 p-2.5 rounded-2xl">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Priority Shipping</h4>
                  <p className="text-xs text-muted-foreground">Complimentary express delivery on orders over $200</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-3xl bg-muted/10 border border-border/30">
                <div className="bg-primary/10 p-2.5 rounded-2xl">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Seamless Returns</h4>
                  <p className="text-xs text-muted-foreground">Premium 30-day return policy for peace of mind</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-3xl bg-muted/10 border border-border/30">
                <div className="bg-primary/10 p-2.5 rounded-2xl">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Quality Guarantee</h4>
                  <p className="text-xs text-muted-foreground">Two-year warranty included on architectural essentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
