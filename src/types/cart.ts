export interface EbbrarRequestStatus {
    getItem: Status;
    addItem: Status
    deleteItem: Status
}

export interface query {
    id?: number;

}

export const defaultQuery: query = {
    id: 1,
}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface cartList {
    cart: Array<Cart>;

}



export interface Cart {
    cartId?: number,
    id?: number;
    menuImage?: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    userId: number;
    endDate: string;
    menuItemID: number

}

export const defaultCart: Cart = {
    productName: '',
    unitPrice: 0,
    quantity: 0,
    userId: 0,
    endDate: '',
    menuItemID: 0
}



