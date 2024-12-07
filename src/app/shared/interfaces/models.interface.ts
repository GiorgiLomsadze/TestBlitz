import { Category } from './category.interface';

export enum ProductType {
    internet = 1,
    tv = 2,
    telephone = 3,
    double = 4,
    offer = 5,
    contracts = 6
}

export enum ProductStatus {
    Active = 0,
    InActive = 1,
    Stoped = 2,
}

export interface ChannelCategory {
    id: number;
    name: string;
}

export interface Channel {
    id: number;
    image: string;
    name: string;
    category: ChannelCategory;
}

export interface Product {
    id: number;
    type: {
        id: ProductType;
        slug: string;
    };
    title: string;
    phoneInfo?: string[];
    tvInfo?: string;
    internetSpeed?: string;
    image: string;
    install: number;
    price: number;
    new_price: number | null;
    sale: number | null;
    category: Category;

    channels?: Channel[];
    status?: ProductStatus;
}

export interface Company {
    id: number;
    title: string;
    info: string;
    price: number;
}

export interface Document {
    name: string;
    date: Date;
    file: string;
}

export interface News {
    id: number;
    tilte: string;
    text: string;
    date: Date;
    image: string;
}

export interface Ads {
    id: number;
    link: string;
    title: string;
    text: string;
    image: string;
}

export interface User {
    clientId: number;
}

export interface UserInfo {
    balance: number;
    packages: {
        address: string;
        list: Product[];
    }[];
}

export interface Calls {
    name: string;
    home: {
        code: string;
        price: number;
    };
    mobilePhone: {
        code: string;
        price: number;
    };
}

export interface IntOption {
    name: string;
    maxSpeed: string;
    minSpeed: string;
    actualSpeed: string;
    giter: string;
    timeout: string;
    lost: string;
    type_id: number;
}

export interface IntOptions {
    [key: string]: IntOption[];
}
