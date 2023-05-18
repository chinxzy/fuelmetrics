export interface query {
    id?: number
    day?: number;
    page?: number;
    limit?: number;
    date?: string;
    type?: string;
    status?: number;
    count?: number;
}

export const defaultQuery: query = {
    id: 0,
    day: 1,
    date: '',
    type: '',
    status: 0,
    page: 1
}