export interface Role {
    _id: string;
    name: string;
}

export interface User {
  _id?: string; 
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role?: Role;
  isActive?: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}