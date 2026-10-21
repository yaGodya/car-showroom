export interface Review {
    id?: number | string;
    reviewerName: string;
    comment: string;
    rating?: number;
    date: string;
}

export interface Car {
    id: number | string;
    title: string;
    brand: string;
    price: number;
    rating: number;
    availabilityStatus: string;
    stock: number;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    description: string;
    thumbnail: string;
    images: string[];
    category?: string;
    reviews?: Review[];
}

export interface FilterState {
    query: string;
    brand: string;
    maxPrice: number | string;
}

export interface VehiclesResponse {
    products: Car[];
    total?: number;
    skip?: number;
    limit?: number;
}
