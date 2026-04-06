export const Endpoint = {
    AUTH: '/api/v1/auth',
    CATEGORIES: '/api/v1/categories',
    PRODUCTS: '/api/v1/products',
    CARTS: '/api/v1/carts',
    FAVORITES: '/api/v1/favorites',
    ORDERS: '/api/v1/orders',
    REWARDS: '/api/v1/rewards',
} as const;

export type EndpointKey = (typeof Endpoint)[keyof typeof Endpoint];