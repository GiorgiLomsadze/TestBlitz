import { Product, Company, Document, News, UserInfo, Ads, Calls, IntOptions } from './models.interface';
import { Init, About, Home } from './init.interface';
import { PackageType } from './category.interface';

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Links {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface Response<T> {
    data: T;
    success: boolean;
    errorCode: number;
    meta?: Meta;
    links?: Links;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface UnAuthResponse {
    error: string;
}

export type AboutResponse = Response<About>;
export type HomeResponse = Response<Home>;
export type ProductResponse = Response<Product[]>;
export type CompanyResponse = Response<Company[]>;
export type DocumentResponse = Response<{
    title: string;
    documents: Document[];
}>;
export type NewsListResponse = Response<News[]>;
export type PackageResponse = Response<PackageType[]>;
export type CountriesResponse = Response<{
    countries: Calls[];
}>;
export type IntOptionsResponse = Response<IntOptions>;
export type CitiesResponse = Response<{
    cities: Calls[];
}>;
export type NewsSingleResponse = Response<{
    news: News;
    more: News[];
}>;
export type AdsResponse = Response<Ads>;
export type UserInfoResponse = Response<UserInfo>;
export type InitResponse = Response<Init>;
