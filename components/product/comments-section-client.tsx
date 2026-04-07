"use client";

import React, { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

interface CommentsSectionProps {
  productId: string;
}

export function CommentsSectionClient({ productId }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="py-20 border-t border-border/50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Comments List - Left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-muted-foreground">
              Read what customers think about this product
            </p>
          </div>
          <CommentList productId={productId} refreshTrigger={refreshTrigger} />
        </div>

        {/* Comment Form - Right */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Leave Your Review</h3>
          <CommentForm
            productId={productId}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      </div>
    </div>
  );
}
