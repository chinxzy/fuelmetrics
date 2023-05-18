export interface StaffRequestStatus {

    getItem: Status;
    addItem: Status

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
    phone: string;
    id: string;
    isSuspended: boolean;

}

export interface StaffPost {
    
        companyId: string;
        userId: string;
        name: string;
        phone: string;
        altPhoneNumber: string;
        email: string;
        address: string;
        city: string;
        state: string;
        roles: string[
          
        ]
      

}



