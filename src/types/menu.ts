export interface EbbrarRequestStatus {
    getMenu: Status;
    getItem: Status;
    addItem: Status
}

export interface query {
    page?: number;
    limit?: number;
    q?: string;
    type?: string;
    status?: string;
}

export const defaultQuery: query = {
    page: 1,
    limit: 25,
    q: '',
    type: '',
    status: '',
}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface menuList {
    menu: Array<Menu>;
    drinks: Array<Drinks>;
    extras: Array<Extras>;
    fruits: Array<Fruits>;
    count: number
}



export interface Menu {
    id: number;
    name: string;
    mealImage: string;
    desc: string;
    price: number;
    endDate: string;
    menuItemId: number
}

export interface Drinks {
    id: number;
    drink: string;
    price: number
}

export interface Extras {
    id: number;
    extra: string;
    price: number
}

export interface Fruits {
    id: number;
    fruit: string;
    price: number
}



