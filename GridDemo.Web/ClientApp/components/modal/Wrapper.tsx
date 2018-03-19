import * as ModalState from '../../store/modal';
import * as React from 'react';
import * as ModalTypes from '../../classes/modalTypes';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ApplicationState } from '../../store';
import CustomerDetailComponent from '../customer/Detail';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

// At runtime, Redux will merge together...
type Props =
    ModalState.State             // ... state we've requested from the Redux store
    & typeof ModalState.actionCreators;             // ... plus action creators we've requested


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ModalWrapper extends React.Component<Props> {

    componentWillMount() {
        // This method runs when the component is first added to the page
    }

    componentWillReceiveProps(nextProps: Props) {
        // This method runs when incoming props (e.g., route params) change
    }
    
    public render() {
        return <Dialog keepMounted transition={Transition} open={this.props.modalStatus} onClose={this.props.closeModal} >
            <DialogTitle>{this.props.title != null ? this.props.title : "Title"}</DialogTitle>
            <DialogContent>
                {(() => {
                    switch (this.props.modalType) {
                        case ModalTypes.ModalTypeCustomerDetail:
                            return <CustomerDetailComponent />;
                        default:
                            null
                    }
                })()}
            </DialogContent>
        </Dialog>;
    }
}


export default connect(
    (state: ApplicationState) => state.modal, // Selects which state properties are merged into the component's props
    ModalState.actionCreators                 // Selects which action creators are merged into the component's props
)(ModalWrapper);

