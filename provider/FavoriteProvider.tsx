"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "@/lib/interface/product.interface";
import { FavoriteService } from "@/service/favorite.service";
import { useAuth } from "./AuthProvider";

interface FavoriteContextType {
  favorites: Product[];
  favoriteCount: number;
  favoriteIds: Set<string>;
  isLoading: boolean;
  refreshFavorites: () => Promise<void>;
  addToFavorites: (productId: string) => Promise<boolean>;
  removeFromFavorites: (productId: string) => Promise<boolean>;
  toggleFavorite: (productId: string) => Promise<boolean>;
  isFavorite: (productId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  favoriteCount: 0,
  favoriteIds: new Set(),
  isLoading: false,
  refreshFavorites: async () => {},
  addToFavorites: async () => false,
  removeFromFavorites: async () => false,
  toggleFavorite: async () => false,
  isFavorite: () => false,
});

export const useFavorite = () => useContext(FavoriteContext);

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

  const addToFavorites = async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().addToFavorites(productId);
    if (response.success) {
      await refreshFavorites();
      return true;
    }
    return false;
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().removeFromFavorites(
      productId,
    );
    if (response.success) {
      await refreshFavorites();
      return true;
    }
    return false;
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) return false;

    const response = await FavoriteService.getInstance().toggleFavorite(productId);
    if (response.success) {
      await refreshFavorites();
      return true;
    }
    return false;
  };

  const isFavorite = useCallback(
    (productId: string) => {
      return favoriteIds.has(productId);
    },
    [favoriteIds],
  );

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoriteCount,
        favoriteIds,
        isLoading,
        refreshFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
