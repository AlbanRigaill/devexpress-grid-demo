export interface CustomersResponse {
    customers: CustomerModel[];
    totalCount: number;
}

export interface CustomerModel {
    id: number;
    name: string;
    email: string;
}

export interface Sorting {
    columnName: string;
    direction: string;
}

export interface Filter {
    columnName: string;
    value: string;
}

