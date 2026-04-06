"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentService } from "@/service/comment.service";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";

interface CommentFormProps {
  productId: string;
  onCommentAdded: () => void;
}

export function CommentForm({ productId, onCommentAdded }: CommentFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter your comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await CommentService.getInstance().createComment({
        productId,
        rating,
        title: title.trim(),
        content: content.trim(),
      });

      if (response.success) {
        toast.success("Comment posted successfully!");
        setTitle("");
        setContent("");
        setRating(5);
        onCommentAdded();
      } else {
        toast.error(response.message || "Failed to post comment");
      }
    } catch (error) {
      toast.error("Error posting comment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Please login to leave a comment
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-8">
      <div>
        <label className="text-sm font-semibold mb-3 block">Rating</label>
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-medium">
            {rating}/5
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-semibold mb-2 block">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter comment title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          maxLength={100}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">{title.length}/100</p>
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-semibold mb-2 block">
          Comment
        </label>
        <textarea
          id="content"
          placeholder="Share your thoughts about this product..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          maxLength={1000}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          {content.length}/1000
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !title.trim() || !content.trim()}
        className="w-full rounded-lg"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
