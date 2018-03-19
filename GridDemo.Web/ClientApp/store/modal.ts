import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as Actions from '../classes/actions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface State {
    modalStatus: boolean;
    title?: string;
    modalType?: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = Actions.IModalCloseAction | Actions.IModalOpenAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    closeModal: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'MODAL_CLOSE' });
    },
};

const initialState = {
    modalStatus: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'MODAL_OPEN':
            return {
                ...state,
                modalStatus: true,
                title: action.title,
                modalType: action.modalType
            };
        case 'MODAL_CLOSE':
            return initialState;
        default:
            break;
    }

    return state || initialState;
};