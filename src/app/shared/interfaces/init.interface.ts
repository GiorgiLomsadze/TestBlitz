import { PackageType } from './category.interface';
import { Product } from './models.interface';

export interface FooterList {
    title: string;
    list: {
        title: string;
        url: string;
    }[];
}

export interface FooterMenu {
    navigations: FooterList[];
}

export interface Init {
    topMenu: PackageType[];
    footerMenu: FooterMenu;
    options: Options;
}

export interface About {
    title: string;
    subTitle: string;
    text: string;
    image: string;
}

export interface Home {
    title: string;
    subTitle: string;
    text: string;
    link: string;
    products: Product[];
}

export interface Options {
    phone1: string;
    phone2: string;
    email: string;
    address: string;
    balance: string;
    twitter: string;
    linkedin: string;
    facebook: string;
}
