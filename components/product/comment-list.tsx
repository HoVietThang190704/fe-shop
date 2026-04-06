"use client";

import React, { useState, useEffect } from "react";
import { Comment } from "@/lib/interface/comment.interface";
import { CommentService } from "@/service/comment.service";
import { CommentItem } from "./comment-item";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CommentListProps {
  productId: string;
  refreshTrigger?: number;
}

export function CommentList({ productId, refreshTrigger = 0 }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await CommentService.getInstance().getCommentsByProduct(
        productId
      );
      if (response.success && response.data) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [productId, refreshTrigger]);

  const handleCommentDeleted = () => {
    loadComments();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">
          Comments ({comments.length})
        </h3>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onCommentDeleted={handleCommentDeleted}
          />
        ))}
      </div>
    </div>
  );
}
