export interface StaffRequestStatus {

    getItem: Status;

}



export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface staffList {
        data: Array<Staff>,

    
    
}



export interface Staff {
    name: string;
    address: string;
    state: string;
    email: string;
    phoneNumber: string;
    id: string;
    isSuspended: boolean;

}



