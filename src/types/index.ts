// данные API
export type Product = {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
    description: string;
};

export type ApiResponse<T> = {
    total: number;
    items: T[];
};

// Данные для отображения
export type Catalog = {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
};

export type Basket = {
    id: string;
    title: string;
    price: number;
    index: number;
};

export type Order = {
    payment: string;
    address: string;
    email: string;
    phone: string;
};

export type SuccessOrder = {
    total: number;
    message: string;
};