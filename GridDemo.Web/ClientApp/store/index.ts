import * as CustomerGrid from './customer/grid';
import * as CustomerDetail from './customer/detail';
import * as Modal from './modal';
import * as Snackbar from './snackbar';

// The top-level state object
export interface ApplicationState {
    customerGrid: CustomerGrid.State;
    customerDetail: CustomerDetail.State;
    modal: Modal.State;
    snackbar: Snackbar.State;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    customerGrid: CustomerGrid.reducer,
    customerDetail: CustomerDetail.reducer,
    modal: Modal.reducer,
    snackbar: Snackbar.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
