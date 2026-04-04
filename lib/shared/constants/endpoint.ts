export const Endpoint = {
    AUTH: '/api/v1/auth',
    CATEGORIES: '/api/v1/categories',
    PRODUCTS: '/api/v1/products',
    CARTS: '/api/v1/carts',
} as const;

export type EndpointKey = (typeof Endpoint)[keyof typeof Endpoint];