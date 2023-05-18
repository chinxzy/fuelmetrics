

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface UserLogin {
    email: string;
    password: string;
}



export interface AuthRequestStatus {
    loginUser: Status;
   
}



