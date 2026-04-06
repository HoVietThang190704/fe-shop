import { User } from "./user.interface";
import { Product } from "./product.interface";

export interface Comment {
  _id: string;
  product: Product | string;
  user: User | string;
  rating: number; // 1-5
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface CreateCommentDTO {
  productId: string;
  rating: number;
  title: string;
  content: string;
}

export interface UpdateCommentDTO {
  rating?: number;
  title?: string;
  content?: string;
}
