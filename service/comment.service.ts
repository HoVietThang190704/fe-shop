import { Endpoint } from "@/lib/shared/constants/endpoint";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export class CommentService {
  private static instance: CommentService;

  private constructor() {}

  static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  /**
   * Get all comments for a product
   */
  async getCommentsByProduct(productId: string) {
    try {
      const url = `${serverUrl}${Endpoint.COMMENTS}/product/${productId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching comments:", error);
      return {
        success: false,
        message: "Failed to fetch comments",
        data: [],
      };
    }
  }

  /**
   * Get single comment by ID
   */
  async getCommentById(commentId: string) {
    try {
      const url = `${serverUrl}${Endpoint.COMMENTS}/${commentId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching comment:", error);
      return {
        success: false,
        message: "Failed to fetch comment",
      };
    }
  }

  /**
   * Create new comment
   */
  async createComment(data: {
    productId: string;
    rating: number;
    title: string;
    content: string;
  }) {
    try {
      const url = `${serverUrl}${Endpoint.COMMENTS}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating comment:", error);
      return {
        success: false,
        message: "Failed to create comment",
      };
    }
  }

  /**
   * Update comment
   */
  async updateComment(
    commentId: string,
    data: {
      rating?: number;
      title?: string;
      content?: string;
    }
  ) {
    try {
      const url = `${serverUrl}${Endpoint.COMMENTS}/${commentId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating comment:", error);
      return {
        success: false,
        message: "Failed to update comment",
      };
    }
  }

  /**
   * Delete comment
   */
  async deleteComment(commentId: string) {
    try {
      const url = `${serverUrl}${Endpoint.COMMENTS}/${commentId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting comment:", error);
      return {
        success: false,
        message: "Failed to delete comment",
      };
    }
  }
}
