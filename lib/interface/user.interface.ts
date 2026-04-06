export interface User {
  _id?: string; 
  username: string;
  email: string;
  fullName?: string;
  name?: string;
  role?: string;
  rule?: string;
  avatar_url?: string;
  avatarUrl?: string;
  isActive?: boolean;
  status?: boolean;
  rewardPoints?: number;
  created?: {
    time: Date;
  };
  modified?: {
    time: Date;
  };
}