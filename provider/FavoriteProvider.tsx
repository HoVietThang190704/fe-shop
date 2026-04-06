"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/lib/interface/product.interface";
import { FavoriteService } from "@/service/favorite.service";
import { useAuth } from "./AuthProvider";

interface FavoriteContextType {
  favorites: Product[];
  favoriteCount: number;
  isLoading: boolean;
  refreshFavorites: () => Promise<void>;
  isFavorite: (productId: string) => boolean;
  addToFavorites: (productId: string) => Promise<boolean>;
  removeFromFavorites: (productId: string) => Promise<boolean>;
  toggleFavorite: (productId: string) => Promise<boolean>;
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  favoriteCount: 0,
  isLoading: false,
  refreshFavorites: async () => {},
  isFavorite: () => false,
  addToFavorites: async () => false,
  removeFromFavorites: async () => false,
  toggleFavorite: async () => false,
});

export const useFavorites = () => useContext(FavoriteContext);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await FavoriteService.getInstance().getFavorites();
      if (response.success && response.data) {
        setFavorites(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((item) => item._id));
  }, [favorites]);

  const favoriteCount = favorites.length;

  const isFavorite = useCallback(
    (productId: string) => {
      return favoriteIds.has(productId);
    },
    [favoriteIds],
  );

  const addToFavorites = useCallback(async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().addToFavorites(productId);
    if (response.success && response.data) {
      setFavorites(response.data);
      return true;
    }

    return false;
  }, [user]);

  const removeFromFavorites = useCallback(async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().removeFromFavorites(productId);
    if (response.success && response.data) {
      setFavorites(response.data);
      return true;
    }

    return false;
  }, [user]);

  const toggleFavorite = useCallback(async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().toggleFavorite(productId);
    if (response.success && response.data) {
      setFavorites(response.data);
      return true;
    }

    return false;
  }, [user]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoriteCount,
        isLoading,
        refreshFavorites,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
