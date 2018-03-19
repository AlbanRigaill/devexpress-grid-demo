import * as Utils from './utils';

// customer / grid

export interface ICustomerGridPageAction {
    type: 'CUSTOMER_GRID_PAGE';
    currentPage: number;
}

export interface ICustomerGridSortingAction {
    type: 'CUSTOMER_GRID_SORTING';
    sorting?: any[];
}

export interface ICustomerGridPageSizeAction {
    type: 'CUSTOMER_GRID_PAGE_SIZE';
    pageSize?: number;
}

export interface ICustomerGridFilterAction {
    type: 'CUSTOMER_GRID_FILTER';
    filters: any[];
}

export interface ICustomerGridSelectionAction {
    type: 'CUSTOMER_GRID_SELECTION';
    selection: number[];
    actualSelection: number[];
}

export interface ICustomerGridRequestAction {
    type: 'CUSTOMER_GRID_REQUEST';
    payload?: string;
}

export interface ICustomerGridReceiveAction {
    type: 'CUSTOMER_GRID_RECEIVE';
    payload?: string;
    results?: Utils.Customer[];
    totalCount?: number;
}