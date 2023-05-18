export interface CompanyRequestStatus {

    getItem: Status;

}

export const defaultCompanyDetails={
name: "",
    address: "",
    state: "",
    country: "",
    email: "",
    phoneNumber: "",
    rcNumber: "",
    businessType: "",
    dateRegistered: "",
    id: "",
    wallet: {
        balance: 0,
        walletUnit: "",    }
}

export const defaultWalletDetails = {
    balance: 0,
    walletUnit: "",
}



export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface companyList {
        company: Company,
        wallet: Wallet
    
    
}
export interface dashboardList {
    dashboard: Dashboard,



}


export interface Company {
    name: string;
    address: string;
    state: string;
    country: string;
    email: string;
    phoneNumber: string;
    id: string;
    rcNumber: string;
    businessType: string,
    dateRegistered: string;

}
export interface Wallet{
 
        balance: number;
        walletUnit: string

}

export interface Dashboard {
    balance: number;
    vouchers: number;
    vehicles: number;
    companyUsers: number;
    subAccount: number;
    totalConsumption: number;
    

}
export const defaultDashboardDetails = {
    balance: 0,
    vouchers: 0,
    vehicles: 0,
    companyUsers: 0,
    subAccount: 0,
    totalConsumption: 0,
}

