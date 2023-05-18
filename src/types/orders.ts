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

export interface orderList {
    data: {
        order: Array<Order>;
    }
    totalCount: number
}



export interface Order {
    id?: number;
    mealImage?: string
    meal: string;
    price: number;
    quantity: number;
    cartId?: number;
    productName: string;
    endDate: string;
    userId: number;
    menuItemID: number;
    dateAdded: string;
    deliveryDate: string;
    status: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    menuItemId: string;
}





