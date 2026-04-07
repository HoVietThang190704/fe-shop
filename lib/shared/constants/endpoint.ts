export const Endpoint = {
    USERS: '/api/v1/users',
    AUTH: '/api/v1/auth',
    CATEGORIES: '/api/v1/categories',
    PRODUCTS: '/api/v1/products',
    CARTS: '/api/v1/carts',
    FAVORITES: '/api/v1/favorites',
    ORDERS: '/api/v1/orders',
    REWARDS: '/api/v1/rewards',
    MESSAGES: '/api/v1/messages',
    // USERS: '/api/v1/users',
    COMMENTS: '/api/v1/comments',
    NOTIFICATIONS: '/api/v1/notifications',
} as const;

export type EndpointKey = (typeof Endpoint)[keyof typeof Endpoint];