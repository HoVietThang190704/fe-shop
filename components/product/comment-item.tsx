"use client";

import React, { useState } from "react";
import { Star, Trash2, Edit2 } from "lucide-react";
import { Comment } from "@/lib/interface/comment.interface";
import { User } from "@/lib/interface/user.interface";
import { useAuth } from "@/provider/AuthProvider";
import { CommentService } from "@/service/comment.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface CommentItemProps {
  comment: Comment;
  onCommentDeleted: () => void;
}

export function CommentItem({ comment, onCommentDeleted }: CommentItemProps) {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(comment.title);
  const [editContent, setEditContent] = useState(comment.content);
  const [editRating, setEditRating] = useState(comment.rating);
  const [isSaving, setIsSaving] = useState(false);

  const commentAuthor = comment.user as User;
  const isOwnComment = user?._id === commentAuthor._id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setIsDeleting(true);
    try {
      const response = await CommentService.getInstance().deleteComment(
        comment._id
      );
      if (response.success) {
        toast.success("Comment deleted successfully");
        onCommentDeleted();
      } else {
        toast.error(response.message || "Failed to delete comment");
      }
    } catch (error) {
      toast.error("Error deleting comment");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const response = await CommentService.getInstance().updateComment(
        comment._id,
        {
          title: editTitle.trim(),
          content: editContent.trim(),
          rating: editRating,
        }
      );

      if (response.success) {
        toast.success("Comment updated successfully");
        setIsEditing(false);
        onCommentDeleted(); // Refresh comments list
      } else {
        toast.error(response.message || "Failed to update comment");
      }
    } catch (error) {
      toast.error("Error updating comment");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  if (isEditing && isOwnComment) {
    return (
      <div className="border-l-4 border-primary bg-muted/30 p-6 rounded-lg space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setEditRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-5 w-5 ${
                    star <= editRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded-lg border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Comment</label>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 mt-1 rounded-lg border border-border bg-background text-foreground resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSaveEdit}
            disabled={isSaving}
            size="sm"
            className="bg-primary"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-l-4 border-primary bg-muted/30 p-6 rounded-lg space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {commentAuthor.fullName
                  ?.charAt(0)
                  .toUpperCase() ||
                  commentAuthor.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {commentAuthor.fullName || commentAuthor.username}
              </p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= comment.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{comment.rating}/5</span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-foreground mb-2">
            {comment.title}
          </h4>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        </div>

        {/* Actions */}
        {isOwnComment && (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 hover:bg-primary/10 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
