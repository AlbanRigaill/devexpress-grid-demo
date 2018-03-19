import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import * as Utils from '../../classes/utils';
import * as Actions from '../../classes/actions';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface State {
    customers?: Utils.CustomerModel[];
    idList?: number[];
    payload?: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = Actions.ICustomerDetailReceiveAction | Actions.ICustomerDetailRequestAction | Actions.ICustomerGridSelectionAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

const URL = `api/customers/listById`;

export const actionCreators = {
    getById: (idList: number[]): AppThunkAction<KnownAction> => (dispatch, getState) => {

        var payload = JSON.stringify({
            idList: idList
        });
        // Only load data if it's something we don't already have (and are not already loading)
        if (payload !== getState().customerDetail.payload) {
            const fetchTask = fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload
            })
                .then(response => response.json() as Promise<Utils.CustomerModel[]>)
                .then(data => {
                    dispatch({
                        type: 'CUSTOMER_DETAIL_RECEIVE', payload: payload, customers: data
                    });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'CUSTOMER_DETAIL_REQUEST', payload: payload });
        }
    }
};

const initialState = {
    customers: [],
    idList: []
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'CUSTOMER_GRID_SELECTION':
            return {
                ...state,
                idList: action.actualSelection
            };
        case 'CUSTOMER_DETAIL_REQUEST':
            return {
                ...state,
                payload: action.payload,
                customers: state.customers
            };
        case 'CUSTOMER_DETAIL_RECEIVE':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.payload === state.payload) {
                return {
                    ...state,
                    payload: action.payload,
                    customers: action.customers
                };
            }
        default:
            break;
    }

    return state || initialState;
};