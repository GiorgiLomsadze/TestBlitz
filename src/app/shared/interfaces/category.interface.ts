import { Product } from './models.interface';

export interface PackageType {
    id: number;
    slug: string;
    name: string;
    categories: Category[];
    products?: Product[];
}

export interface Category {
    id?: number;
    slug?: string;
    name: string;
    products?: Product[];
}
