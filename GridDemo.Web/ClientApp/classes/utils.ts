export interface CustomerResponse {
    results: Customer[];
    totalCount: number;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
}
