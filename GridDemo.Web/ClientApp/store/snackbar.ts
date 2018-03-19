import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as Actions from '../classes/actions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface State {
    snackbarStatus: boolean;
    text?: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = Actions.ISnackbarCloseAction | Actions.ISnackbarOpenAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    closeSnackbar: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SNACKBAR_CLOSE' });
    },
};

const initialState = {
    snackbarStatus: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'SNACKBAR_OPEN':
            return {
                ...state,
                snackbarStatus: true,
                text: action.text
            };
        case 'SNACKBAR_CLOSE':
            return initialState;
        default:
            break;
    }

    return state || initialState;
};