import * as Utils from './utils';

// customer / grid

export interface ICustomerGridPageAction {
    type: 'CUSTOMER_GRID_PAGE';
    currentPage: number;
}

export interface ICustomerGridSortingAction {
    type: 'CUSTOMER_GRID_SORTING';
    sorting?: Utils.Sorting[];
}

export interface ICustomerGridPageSizeAction {
    type: 'CUSTOMER_GRID_PAGE_SIZE';
    pageSize?: number;
}

export interface ICustomerGridFilterAction {
    type: 'CUSTOMER_GRID_FILTER';
    filters: Utils.Filter[];
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
    customers?: Utils.CustomerModel[];
    totalCount?: number;
}


// modal

export interface IModalOpenAction {
    type: 'MODAL_OPEN';
    title?: string;
    modalType?: number;
}

export interface IModalCloseAction {
    type: 'MODAL_CLOSE';
}

// snackbars

export interface ISnackbarOpenAction {
    type: 'SNACKBAR_OPEN';
    text?: string;
}

export interface ISnackbarCloseAction {
    type: 'SNACKBAR_CLOSE';
}

// customer / detail

export interface ICustomerDetailRequestAction {
    type: 'CUSTOMER_DETAIL_REQUEST';
    payload?: string;
}

export interface ICustomerDetailReceiveAction {
    type: 'CUSTOMER_DETAIL_RECEIVE';
    payload?: string;
    customers?: Utils.CustomerModel[];
}