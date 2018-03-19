import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import * as Utils from '../../classes/utils';
import * as Actions from '../../classes/actions';
import * as ModalTypes from '../../classes/modalTypes';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface State {
    columns: any[];
    rows: any[];
    sorting: Utils.Sorting[];
    currentPage: number;
    totalCount: number;
    pageSize: number;
    pageSizes: number[];
    filters: Utils.Filter[];
    selection: number[];
    actualSelection: number[];
    payload: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = Actions.ICustomerGridFilterAction | Actions.ICustomerGridPageAction | Actions.ICustomerGridPageSizeAction |
    Actions.ICustomerGridReceiveAction | Actions.ICustomerGridRequestAction | Actions.ICustomerGridSelectionAction |
    Actions.ICustomerGridSortingAction | Actions.IModalOpenAction | Actions.ISnackbarOpenAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

const URL = `api/customers/list`;

export const actionCreators = {
    openCustomerDetailModal: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'MODAL_OPEN', title: 'Customer detail', modalType: ModalTypes.ModalTypeCustomerDetail });
    },
    openSnackbar: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SNACKBAR_OPEN', text: 'Test snackbar' });
    },
    onSortingChange: (sorting: Utils.Sorting[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (sorting !== getState().customerGrid.sorting) {
            dispatch({ type: 'CUSTOMER_GRID_SORTING', sorting: sorting });
        }
    },
    onCurrentPageChange: (currentPage: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (currentPage !== getState().customerGrid.currentPage) {
            dispatch({ type: 'CUSTOMER_GRID_PAGE', currentPage: currentPage });
        }
    },
    onPageSizeChange: (pageSize: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (pageSize !== getState().customerGrid.pageSize) {
            dispatch({ type: 'CUSTOMER_GRID_PAGE_SIZE', pageSize: pageSize });
        }
    },
    onFiltersChange: (filters: Utils.Filter[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (filters !== getState().customerGrid.filters) {
            dispatch({ type: 'CUSTOMER_GRID_FILTER', filters: filters });
        }
    },
    onSelectionChange: (selection: number[]): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let actualSelection = getState().customerGrid.actualSelection;

        // add to actual selection
        if (selection.length > getState().customerGrid.selection.length) {
            for (let i of selection) {
                if (getState().customerGrid.selection.indexOf(i) === -1) {
                    actualSelection.push(getState().customerGrid.rows[i].id)
                }
            }
        }

        // remove from actual selection
        else if (getState().customerGrid.selection.length > selection.length) {
            for (let i of getState().customerGrid.selection) {
                if (selection.indexOf(i) === -1) {
                    actualSelection = actualSelection.filter(o => o !== getState().customerGrid.rows[i].id);
                }
            }
        }
        
        if (selection !== getState().customerGrid.selection) {
            dispatch({ type: 'CUSTOMER_GRID_SELECTION', selection: selection, actualSelection: actualSelection });
        }
    },
    list: (currentPage: number, pageSize: number, sorting: Utils.Sorting[], filters: Utils.Filter[]): AppThunkAction<KnownAction> => (dispatch, getState) => {

        var payload = JSON.stringify({
            startIndex: pageSize * currentPage,
            pageSize: pageSize,
            orderBy: sorting[0].columnName,
            isSortDescending: sorting[0].direction === 'desc',
            filters: filters
        });
        // Only load data if it's something we don't already have (and are not already loading)
        if (payload !== getState().customerGrid.payload) {
            const fetchTask = fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload
            }).then(response => response.json() as Promise<Utils.CustomersResponse>)
                .then(data => {
                    dispatch({
                        type: 'CUSTOMER_GRID_RECEIVE', payload: payload, customers: data.customers, totalCount: data.totalCount
                    });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'CUSTOMER_GRID_REQUEST', payload: payload });
        }
    }
};

const initialState = {
    columns: [
        { name: "id", title: "ID" },
        { name: "name", title: "Nom" },
        { name: "email", title: "Email" }
    ],
    rows: [],
    sorting: [{ columnName: "id", direction: "asc" }],
    currentPage: 0,
    totalCount: 0,
    pageSize: 10,
    pageSizes: [5, 10, 20],
    filters: [],
    selection: [],
    actualSelection: [],
    payload: ""
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'CUSTOMER_GRID_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case 'CUSTOMER_GRID_SORTING':
            return {
                ...state,
                sorting: action.sorting
            };
        case 'CUSTOMER_GRID_PAGE_SIZE':
            const newPage = Math.trunc(
                state.currentPage * state.pageSize / action.pageSize
            );
            return {
                ...state,
                currentPage: newPage,
                pageSize: action.pageSize
            };
        case 'CUSTOMER_GRID_FILTER':
            return {
                ...state,
                filters: action.filters,
                currentPage: 0
            };
        case 'CUSTOMER_GRID_SELECTION':
            return {
                ...state,
                selection: action.selection,
                actualSelection: action.actualSelection
            };
        case 'CUSTOMER_GRID_REQUEST':
            return {
                ...state,
                payload: action.payload,
                rows: state.rows
            };
        case 'CUSTOMER_GRID_RECEIVE':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.payload === state.payload) {

                let updatedSelection: number[] = [];
                for (var i = 0; i < action.customers.length; i++) {
                    if (state.actualSelection.indexOf(action.customers[i].id) !== -1) {
                        updatedSelection.push(i);
                    }
                }

                return {
                    ...state,
                    payload: action.payload,
                    rows: action.customers,
                    totalCount: action.totalCount,
                    selection: updatedSelection
                };
            }
        default:
            break;
    }

    return state || initialState;
};